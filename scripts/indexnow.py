"""Notify IndexNow after a verified production release; use only Python's standard library."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
from html.parser import HTMLParser
from io import BytesIO
import json
import os
from pathlib import Path
import re
import subprocess
import time
from urllib.error import HTTPError
from urllib.parse import urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener
from urllib.robotparser import RobotFileParser
from xml.etree import ElementTree
from zipfile import ZipFile

ORIGIN = "https://www.anrotex.com"
REPOSITORY = "Anuj010594/Anrotex"
ROOT = Path(__file__).resolve().parent.parent
STATE = ROOT / ".indexnow/state.json"
KEY_FILE = ROOT / "public/indexnow-key.txt"


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def request(url, payload=None):
    data = json.dumps(payload).encode() if payload is not None else None
    headers = {"User-Agent": "Anrotex-IndexNow/1.0", "Cache-Control": "no-cache"}
    if data is not None:
        headers["Content-Type"] = "application/json; charset=utf-8"
    try:
        with build_opener(NoRedirect).open(Request(url, data=data, headers=headers), timeout=30) as response:
            return response.status, response.headers, response.read()
    except HTTPError as error:
        return error.code, error.headers, error.read()


def public_url(url):
    parsed = urlsplit(url)
    if (parsed.scheme != "https" or parsed.netloc != "www.anrotex.com"
            or parsed.query or parsed.fragment or not parsed.path.startswith("/")):
        raise ValueError(f"Not a canonical Anrotex URL: {url}")
    return url


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.main = False
        self.has_main = False
        self.title = False
        self.skip = None
        self.schema = False
        self.tokens = []
        self.canonicals = []
        self.robots = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "main":
            self.main = self.has_main = True
        if tag == "title":
            self.title = True
        if tag in ("script", "style"):
            self.skip = tag
            self.schema = tag == "script" and attrs.get("type") == "application/ld+json"
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs.get("href"))
        if tag == "meta":
            name = attrs.get("name", attrs.get("property", ""))
            if name == "robots":
                self.robots.append(attrs.get("content", ""))
            if name in ("description", "robots") or name.startswith(("og:", "twitter:")):
                self.tokens.append((name, attrs.get("content", "")))
        if self.main and not self.skip:
            if tag in ("a", "img", "video", "source"):
                self.tokens.append((tag, [(key, attrs[key]) for key in ("href", "src", "alt", "poster") if key in attrs]))
            if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
                self.tokens.append(("heading", tag))

    def handle_endtag(self, tag):
        if tag == "main":
            self.main = False
        if tag == "title":
            self.title = False
        if tag == self.skip:
            self.skip = None
            self.schema = False

    def handle_data(self, data):
        if self.schema:
            self.tokens.append(("schema", json.loads(data)))
        elif not self.skip and (self.main or self.title):
            text = " ".join(data.split())
            if text:
                self.tokens.append(("text", text))


def fingerprint(html, url, headers=None):
    page = Page()
    page.feed(html)
    directives = ",".join(page.robots + [(headers or {}).get("X-Robots-Tag", "")]).lower()
    if (not page.has_main or page.canonicals != [url]
            or "noindex" in directives or "none" in re.split(r"[,\s:]+", directives)):
        raise ValueError(f"Page is missing content, has a different canonical, or blocks indexing: {url}")
    return sha256(json.dumps(page.tokens, ensure_ascii=False, sort_keys=True).encode()).hexdigest()


def snapshot():
    status, _, body = request(ORIGIN + "/sitemap.xml")
    if status != 200:
        raise RuntimeError(f"Sitemap returned HTTP {status}")
    root = ElementTree.fromstring(body)
    urls = [public_url(node.text) for node in root.findall("{*}url/{*}loc")]
    if not urls or len(urls) != len(set(urls)) or len(urls) > 10000:
        raise ValueError("Sitemap is empty, duplicated or exceeds one IndexNow batch")
    status, _, body = request(ORIGIN + "/robots.txt")
    if status != 200:
        raise RuntimeError(f"Robots file returned HTTP {status}")
    robots = RobotFileParser()
    robots.parse(body.decode("utf-8").splitlines())
    if any(not robots.can_fetch("Bingbot", url) for url in urls):
        raise ValueError("The sitemap includes a page blocked for Bingbot")

    def fetch_page(url):
        status, headers, body = request(url)
        if status != 200:
            raise RuntimeError(f"Page returned HTTP {status}: {url}")
        return url, fingerprint(body.decode("utf-8"), url, headers)

    with ThreadPoolExecutor(max_workers=4) as pool:
        return dict(sorted(pool.map(fetch_page, urls)))


def changes(previous, current):
    for url, digest in list(previous.items()) + list(current.items()):
        public_url(url)
        if not re.fullmatch(r"[a-f0-9]{64}", digest):
            raise ValueError("Invalid page fingerprint")
    return sorted(url for url in previous.keys() | current.keys() if previous.get(url) != current.get(url))


def github(path):
    return subprocess.check_output(["gh", "api", f"repos/{REPOSITORY}/{path}"])


def previous_state():
    runs = json.loads(github("actions/workflows/indexnow.yml/runs?status=success&per_page=10"))["workflow_runs"]
    for run in runs:
        if str(run["id"]) == os.environ.get("GITHUB_RUN_ID"):
            continue
        artifacts = json.loads(github(f"actions/runs/{run['id']}/artifacts"))["artifacts"]
        for artifact in artifacts:
            if artifact["name"] == "indexnow-state" and not artifact["expired"]:
                with ZipFile(BytesIO(github(f"actions/artifacts/{artifact['id']}/zip"))) as archive:
                    state = json.loads(archive.read("state.json"))
                    if state.get("version") != 1:
                        raise ValueError("Unknown IndexNow state version")
                    return state["pages"]
    # shortcut: artifact expiry falls back to this baseline and may repeat old changes; refresh it after a long publishing pause.
    return json.loads((ROOT / "scripts/indexnow-baseline.json").read_text())["pages"]


def production_matches(commit):
    status, _, body = request(ORIGIN + "/release.json")
    if status != 200:
        return False
    release = json.loads(body)
    return release.get("commit") == commit and release.get("branch") == "main"


def submit(urls, key):
    if not re.fullmatch(r"[a-zA-Z0-9-]{8,128}", key):
        raise ValueError("Invalid IndexNow key")
    if not urls or len(urls) > 10000:
        raise ValueError("IndexNow requires 1–10000 URLs")
    for url in urls:
        public_url(url)
    key_url = ORIGIN + "/indexnow-key.txt"
    status, _, body = request(key_url)
    if status != 200 or body.decode().strip() != key:
        raise RuntimeError("The deployed IndexNow key does not match")
    status, _, _ = request("https://api.indexnow.org/indexnow", {
        "host": "www.anrotex.com", "key": key, "keyLocation": key_url, "urlList": urls,
    })
    if status not in (200, 202):
        raise RuntimeError(f"IndexNow returned HTTP {status}; keep the previous state and retry the workflow later")
    return status


def notify(commit, previous, dry_run=False):
    if not re.fullmatch(r"[a-f0-9]{40}", commit):
        raise ValueError("A full production commit SHA is required")
    for attempt in range(6):
        if production_matches(commit):
            break
        if attempt == 5:
            print("Skipped: the production domain is not serving this main release.")
            return None
        time.sleep(10)
    current = snapshot()
    urls = changes(previous, current)
    if not production_matches(commit):
        raise RuntimeError("Production changed during the check; no URLs submitted")
    print(json.dumps({"changed_urls": urls, "dry_run": dry_run}, indent=2))
    status = submit(urls, KEY_FILE.read_text().strip()) if urls and not dry_run else None
    result = {"version": 1, "commit": commit, "pages": current, "submitted": urls if not dry_run else [], "http_status": status}
    if not dry_run:
        STATE.parent.mkdir(parents=True, exist_ok=True)
        STATE.write_text(json.dumps(result, indent=2) + "\n")
        if os.environ.get("GITHUB_OUTPUT"):
            with open(os.environ["GITHUB_OUTPUT"], "a") as output:
                output.write("save_state=true\n")
        if os.environ.get("GITHUB_STEP_SUMMARY"):
            with open(os.environ["GITHUB_STEP_SUMMARY"], "a") as summary:
                summary.write(f"IndexNow received {len(urls)} changed URLs. HTTP result: {status or 'no submission needed'}. Receipt does not confirm indexing.\n")
                summary.writelines(f"- {url}\n" for url in urls)
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--snapshot", type=Path, help="Capture the current public pages as the initial baseline")
    parser.add_argument("--commit", default=os.environ.get("DEPLOYMENT_SHA"))
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    if args.snapshot:
        args.snapshot.write_text(json.dumps({"version": 1, "pages": snapshot()}, indent=2) + "\n")
    else:
        notify(args.commit or "", previous_state(), args.dry_run)
