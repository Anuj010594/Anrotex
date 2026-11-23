from pathlib import Path
from tempfile import TemporaryDirectory
from io import BytesIO
import json
import unittest
from unittest.mock import patch
from zipfile import ZipFile

import indexnow

URL = indexnow.ORIGIN + "/about"
SHA = "a" * 40


def page(text="Cloud engineers", description="Meet our engineers", extra="", css="old"):
    return f'''<html><head><title>About</title><link rel="canonical" href="{URL}">
    <meta name="robots" content="index, follow"><meta name="description" content="{description}">
    <script src="/assets/{css}.js"></script>{extra}</head>
    <body><nav>Navigation</nav><main class="{css}"><h1>{text}</h1><a href="/services">Services</a></main>
    <footer>Copyright 2026</footer></body></html>'''


class IndexNowTests(unittest.TestCase):
    def setUp(self):
        environment = patch.dict(indexnow.os.environ, {}, clear=True)
        environment.start()
        self.addCleanup(environment.stop)

    def test_content_metadata_links_and_schema_change_fingerprint(self):
        original = indexnow.fingerprint(page(), URL)
        for html in [page(text="AWS engineers"), page(description="Meet Anrotex"),
                     page().replace('href="/services"', 'href="/contact"'),
                     page(extra='<script type="application/ld+json">{"name":"Anrotex"}</script>')]:
            self.assertNotEqual(original, indexnow.fingerprint(html, URL))

    def test_assets_layout_and_analytics_do_not_notify_every_page(self):
        self.assertEqual(indexnow.fingerprint(page(), URL), indexnow.fingerprint(
            page(css="new", extra='<script>analytics("test")</script>').replace("2026", "2027"), URL))

    def test_noindex_wrong_canonical_and_missing_content_fail(self):
        for html, headers in [(page().replace("index, follow", "noindex"), {}),
                              (page().replace(URL, indexnow.ORIGIN + "/"), {}),
                              (page().replace("main", "section"), {}),
                              (page(), {"X-Robots-Tag": "noindex"}),
                              (page(), {"X-Robots-Tag": "bingbot: none"})]:
            with self.assertRaises(ValueError):
                indexnow.fingerprint(html, URL, headers)

    def test_added_changed_removed_and_unchanged_pages(self):
        old = {URL: "1" * 64, indexnow.ORIGIN + "/gone": "2" * 64}
        new = {URL: "3" * 64, indexnow.ORIGIN + "/new": "4" * 64}
        self.assertEqual(indexnow.changes(old, new), sorted(old.keys() | new.keys()))
        self.assertEqual(indexnow.changes(old, old), [])

    def test_offsite_and_parameter_urls_are_rejected(self):
        for url in ["https://evil.example/about", "https://www.anrotex.com.evil.example/about",
                    "http://www.anrotex.com/about", URL + "?email=private", URL + "#details"]:
            with self.assertRaises(ValueError):
                indexnow.changes({}, {url: "1" * 64})

    def test_missing_key_or_rejected_submission_does_not_count_as_success(self):
        key = "a" * 32
        with patch.object(indexnow, "request", return_value=(404, {}, b"")) as request:
            with self.assertRaises(RuntimeError):
                indexnow.submit([URL], key)
            self.assertEqual(request.call_count, 1)
        for status in [403, 422, 429, 500]:
            with patch.object(indexnow, "request", side_effect=[(200, {}, key.encode()), (status, {}, b"")]):
                with self.assertRaises(RuntimeError):
                    indexnow.submit([URL], key)

    def test_accepted_and_key_verification_pending_are_both_recorded(self):
        key = "a" * 32
        for status in [200, 202]:
            with patch.object(indexnow, "request", side_effect=[(200, {}, key.encode()), (status, {}, b"")]) as request:
                self.assertEqual(indexnow.submit([URL], key), status)
                self.assertEqual(request.call_args.args[1]["urlList"], [URL])
                self.assertEqual(request.call_args.args[1]["keyLocation"], indexnow.ORIGIN + "/indexnow-key.txt")

    def test_stale_or_preview_deployment_does_not_submit_or_save(self):
        with TemporaryDirectory() as directory, patch.object(indexnow, "STATE", Path(directory) / "state.json"), \
                patch.object(indexnow, "production_matches", return_value=False), \
                patch.object(indexnow.time, "sleep"), patch.object(indexnow, "snapshot") as snapshot:
            self.assertIsNone(indexnow.notify(SHA, {}))
            snapshot.assert_not_called()
            self.assertFalse(indexnow.STATE.exists())

    def test_failed_notification_keeps_previous_state_and_rerun_succeeds(self):
        with TemporaryDirectory() as directory, patch.object(indexnow, "STATE", Path(directory) / "state.json"), \
                patch.object(indexnow, "production_matches", return_value=True), \
                patch.object(indexnow, "snapshot", return_value={URL: "1" * 64}), \
                patch.object(indexnow, "submit", side_effect=[RuntimeError("429"), 200]):
            indexnow.STATE.write_text("previous")
            with self.assertRaises(RuntimeError):
                indexnow.notify(SHA, {})
            self.assertEqual(indexnow.STATE.read_text(), "previous")
            self.assertEqual(indexnow.notify(SHA, {})["submitted"], [URL])

    def test_unchanged_release_and_dry_run_do_not_submit(self):
        pages = {URL: "1" * 64}
        with TemporaryDirectory() as directory, patch.object(indexnow, "STATE", Path(directory) / "state.json"), \
                patch.object(indexnow, "production_matches", return_value=True), \
                patch.object(indexnow, "snapshot", return_value=pages), patch.object(indexnow, "submit") as submit:
            indexnow.notify(SHA, {}, dry_run=True)
            self.assertFalse(indexnow.STATE.exists())
            indexnow.notify(SHA, pages)
            self.assertTrue(indexnow.STATE.exists())
            submit.assert_not_called()

    def test_deployment_changing_during_scan_does_not_submit(self):
        with patch.object(indexnow, "production_matches", side_effect=[True, False]), \
                patch.object(indexnow, "snapshot", return_value={URL: "1" * 64}), \
                patch.object(indexnow, "submit") as submit:
            with self.assertRaises(RuntimeError):
                indexnow.notify(SHA, {})
            submit.assert_not_called()

    def test_sitemap_cannot_notify_a_robots_blocked_page(self):
        sitemap = f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{URL}</loc></url></urlset>'
        with patch.object(indexnow, "request", side_effect=[(200, {}, sitemap.encode()),
                (200, {}, b"User-agent: Bingbot\nDisallow: /about\n")]):
            with self.assertRaises(ValueError):
                indexnow.snapshot()

    def test_restore_previous_accepted_state_from_artifact(self):
        data = BytesIO()
        with ZipFile(data, "w") as archive:
            archive.writestr("state.json", json.dumps({"version": 1, "pages": {URL: "1" * 64}}))
        with patch.object(indexnow, "github", side_effect=[
                b'{"workflow_runs":[{"id":123}]}',
                b'{"artifacts":[{"id":456,"name":"indexnow-state","expired":false}]}', data.getvalue()]):
            self.assertEqual(indexnow.previous_state(), {URL: "1" * 64})

    def test_first_release_uses_checked_in_baseline(self):
        with patch.object(indexnow, "github", return_value=b'{"workflow_runs":[]}'):
            self.assertEqual(indexnow.previous_state(), json.loads(
                (indexnow.ROOT / "scripts/indexnow-baseline.json").read_text())["pages"])


if __name__ == "__main__":
    unittest.main()
