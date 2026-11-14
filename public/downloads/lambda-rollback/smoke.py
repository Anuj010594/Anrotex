"""Signed end-to-end gateway check; creates a labelled synthetic verification record."""
import argparse
import json
import re
import urllib.error
import urllib.request
import uuid

MAX_RESPONSE_BYTES = 64 * 1024


def validate_region(region):
    if not re.fullmatch(r"[a-z]{2}(?:-gov)?-[a-z]+-[0-9]", region):
        raise ValueError("Use an AWS region such as us-east-1")


def validate_target(base, region):
    validate_region(region)
    if not re.fullmatch(r"https://[a-z0-9]+\.execute-api\." + re.escape(region) + r"\.amazonaws\.com", base):
        raise ValueError("Use the exact HTTPS API Gateway endpoint without a trailing slash")


def aws_client(session, service, region):
    from botocore.config import Config
    return session.client(service, region_name=region,
                          config=Config(ignore_configured_endpoint_urls=True))


def confirmed_session(region, account):
    validate_region(region)
    if not re.fullmatch(r"[0-9]{12}", account):
        raise ValueError("Provide the 12-digit AWS test account ID")
    import boto3
    session = boto3.Session(region_name=region)
    if aws_client(session, "sts", region).get_caller_identity()["Account"] != account:
        raise RuntimeError("AWS credentials do not belong to the confirmed test account")
    return session


def read_json(stream):
    data = stream.read(MAX_RESPONSE_BYTES + 1)
    if len(data) > MAX_RESPONSE_BYTES:
        raise RuntimeError("The application response exceeded the size limit")
    result = json.loads(data)
    if not isinstance(result, dict):
        raise RuntimeError("Expected a JSON object from the application")
    return result


def record_path(record):
    # This application's record IDs are SHA-256 values, never URL paths.
    identifier = record.get("id") if isinstance(record, dict) else None
    if not isinstance(identifier, str) or not re.fullmatch(r"[a-f0-9]{64}", identifier):
        raise RuntimeError("The application returned an invalid record ID")
    return "/requests/" + identifier


def request_json(opener, base, region, credentials, method, path, payload=None, signed=True, key=None):
    body = json.dumps(payload).encode() if payload is not None else None
    headers = {"Content-Type": "application/json"}
    if key is not None:
        headers["Idempotency-Key"] = key
    if signed:
        from botocore.auth import SigV4Auth
        from botocore.awsrequest import AWSRequest
        aws_request = AWSRequest(method=method, url=base + path, data=body, headers=headers)
        SigV4Auth(credentials, "execute-api", region).add_auth(aws_request)
        headers = dict(aws_request.headers)
    req = urllib.request.Request(base + path, data=body, headers=headers, method=method)
    try:
        with opener.open(req, timeout=15) as result:
            return result.status, read_json(result)
    except urllib.error.HTTPError as exc:
        with exc:
            return exc.code, {}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *_args, **_kwargs):
        return None


def verify(base, region, release_id, session):
    validate_target(base, region)
    credentials = session.get_credentials()
    if credentials is None:
        raise RuntimeError("No AWS credentials available")
    credentials = credentials.get_frozen_credentials()
    key = "smoke-" + str(uuid.uuid4())
    opener = urllib.request.build_opener(NoRedirect)

    def request(method, path, payload=None, signed=True):
        return request_json(opener, base, region, credentials, method, path, payload, signed, key)

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
    status, record = request("GET", record_path(first))
    if status != 200 or record != first:
        raise RuntimeError("Gateway persistence check failed")
    return {"release": release_id, "authenticated_gateway_checks": 4}


def main(argv=None):
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True)
    parser.add_argument("--region", required=True)
    parser.add_argument("--release", required=True)
    parser.add_argument("--confirm-test-account", required=True,
                        help="12-digit ID of the separate AWS test account; this command writes test records")
    args = parser.parse_args(argv)
    validate_target(args.url, args.region)
    session = confirmed_session(args.region, args.confirm_test_account)
    print(json.dumps(verify(args.url, args.region, args.release, session), indent=2))


if __name__ == "__main__":
    main()
