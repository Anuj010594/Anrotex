"""Signed end-to-end gateway check; creates a labelled synthetic verification record."""
import argparse
import json
import re
import urllib.error
import urllib.request
import uuid

import boto3
from botocore.auth import SigV4Auth
from botocore.awsrequest import AWSRequest


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *_args, **_kwargs):
        return None


def verify(base, region, release_id):
    if not re.fullmatch(r"https://[a-z0-9]+\.execute-api\." + re.escape(region) + r"\.amazonaws\.com", base):
        raise ValueError("Use the exact HTTPS API Gateway endpoint without a trailing slash")
    credentials = boto3.Session().get_credentials()
    if credentials is None:
        raise RuntimeError("No AWS credentials available")
    credentials = credentials.get_frozen_credentials()
    key = "smoke-" + str(uuid.uuid4())

    def request(method, path, payload=None, signed=True):
        body = json.dumps(payload).encode() if payload is not None else None
        headers = {"Content-Type": "application/json", "Idempotency-Key": key}
        aws_request = AWSRequest(method=method, url=base + path, data=body, headers=headers)
        if signed:
            SigV4Auth(credentials, "execute-api", region).add_auth(aws_request)
        req = urllib.request.Request(base + path, data=body, headers=dict(aws_request.headers), method=method)
        try:
            with urllib.request.build_opener(NoRedirect).open(req, timeout=15) as result:
                return result.status, json.load(result)
        except urllib.error.HTTPError as exc:
            with exc:
                return exc.code, {}

    status, _ = request("GET", "/health", signed=False)
    if status not in (401, 403):
        raise RuntimeError("Unsigned requests were not denied")
    status, health = request("GET", "/health")
    if status != 200 or health.get("release") != release_id:
        raise RuntimeError("Gateway release mismatch")
    payload = {"service": "release-check", "summary": "Automated gateway persistence check", "priority": "normal"}
    status, first = request("POST", "/requests", payload)
    if status != 201:
        raise RuntimeError("Gateway create failed")
    status, again = request("POST", "/requests", payload)
    if status != 200 or again != first:
        raise RuntimeError("Gateway idempotency check failed")
    status, record = request("GET", "/requests/" + first["id"])
    if status != 200 or record != first:
        raise RuntimeError("Gateway persistence check failed")
    return {"release": release_id, "authenticated_gateway_checks": 5}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True)
    parser.add_argument("--region", required=True)
    parser.add_argument("--release", required=True)
    args = parser.parse_args()
    print(json.dumps(verify(args.url, args.region, args.release), indent=2))
