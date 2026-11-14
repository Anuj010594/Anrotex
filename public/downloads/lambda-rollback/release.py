"""Publish -> probe immutable version -> promote alias -> probe gateway -> rollback on failure."""
import argparse
import hashlib
import json
import re
from contextlib import closing
from pathlib import Path
from smoke import aws_client, confirmed_session, read_json, record_path, validate_target


def event(method, path, body=None, key="release-healthcheck-001"):
    return {
        "version": "2.0", "rawPath": path,
        "requestContext": {"http": {"method": method},
                           "authorizer": {"iam": {"userArn": "release-check"}}},
        "headers": {"content-type": "application/json", "idempotency-key": key},
        "body": json.dumps(body) if body is not None else None,
    }


def candidate_check(client, name, version, expected_release):
    def invoke(payload):
        result = client.invoke(FunctionName=name, Qualifier=version,
                               Payload=json.dumps(payload).encode())
        with closing(result["Payload"]) as stream:
            if result.get("FunctionError"):
                raise RuntimeError("Candidate Lambda invocation failed")
            return read_json(stream)

    health = invoke(event("GET", "/health"))
    if health["statusCode"] != 200 or json.loads(health["body"])["release"] != expected_release:
        raise RuntimeError("Candidate release mismatch")
    body = {"service": "release-check", "summary": "Automated release persistence check", "priority": "normal"}
    key = "release-" + hashlib.sha256(expected_release.encode()).hexdigest()
    created = invoke(event("POST", "/requests", body, key))
    if created["statusCode"] not in (200, 201):
        raise RuntimeError("Candidate write failed")
    record = json.loads(created["body"])
    read = invoke(event("GET", record_path(record)))
    if read["statusCode"] != 200 or json.loads(read["body"])["summary"] != body["summary"]:
        raise RuntimeError("Candidate read failed")


def release(client, name, artifact, release_id, probe, check=candidate_check):
    previous = client.get_alias(FunctionName=name, Name="live")
    if previous.get("RoutingConfig", {}).get("AdditionalVersionWeights"):
        raise RuntimeError("Weighted aliases are outside this release workflow")
    current = client.get_function(FunctionName=name)
    upload = client.update_function_code(
        FunctionName=name, ZipFile=artifact, Publish=True,
        RevisionId=current["Configuration"]["RevisionId"],
    )
    client.get_waiter("function_updated_v2").wait(FunctionName=name)
    version = upload["Version"]
    check(client, name, version, release_id)
    promoted = client.update_alias(FunctionName=name, Name="live", FunctionVersion=version,
                                   RevisionId=previous["RevisionId"])
    try:
        probe(release_id)
    except Exception:
        # RevisionId prevents overwriting somebody else's subsequent promotion.
        client.update_alias(FunctionName=name, Name="live", FunctionVersion=previous["FunctionVersion"],
                            RevisionId=promoted["RevisionId"])
        print(json.dumps({"event": "rollback", "restored_version": previous["FunctionVersion"]}), flush=True)
        raise
    return {"event": "promoted", "previous_version": previous["FunctionVersion"], "version": version, "release": release_id}


def main(argv=None):
    from smoke import verify
    parser = argparse.ArgumentParser()
    parser.add_argument("--function", required=True, help="Lambda function name in the confirmed test account, not an ARN")
    parser.add_argument("--artifact", type=Path, required=True)
    parser.add_argument("--release", required=True)
    parser.add_argument("--url", required=True)
    parser.add_argument("--region", required=True)
    parser.add_argument("--confirm-test-account", required=True,
                        help="12-digit ID of the separate AWS test account; this command changes code and the live alias")
    args = parser.parse_args(argv)
    validate_target(args.url, args.region)
    if not re.fullmatch(r"[a-zA-Z0-9_-]{1,64}", args.function):
        raise ValueError("Use a function name in the confirmed test account, not an ARN")
    artifact = args.artifact.read_bytes()
    session = confirmed_session(args.region, args.confirm_test_account)
    print(json.dumps(release(aws_client(session, "lambda", args.region), args.function,
                             artifact, args.release,
                             lambda expected: verify(args.url, args.region, expected, session)), indent=2))


if __name__ == "__main__":
    main()
