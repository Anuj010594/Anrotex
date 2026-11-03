"""Publish -> probe immutable version -> promote alias -> probe gateway -> rollback on failure."""
import argparse
import hashlib
import json
from pathlib import Path


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
        if result.get("FunctionError"):
            raise RuntimeError("Candidate Lambda invocation failed")
        return json.loads(result["Payload"].read())

    health = invoke(event("GET", "/health"))
    if health["statusCode"] != 200 or json.loads(health["body"])["release"] != expected_release:
        raise RuntimeError("Candidate release mismatch")
    body = {"service": "release-check", "summary": "Automated release persistence check", "priority": "normal"}
    key = "release-" + hashlib.sha256(expected_release.encode()).hexdigest()
    created = invoke(event("POST", "/requests", body, key))
    if created["statusCode"] not in (200, 201):
        raise RuntimeError("Candidate write failed")
    record = json.loads(created["body"])
    read = invoke(event("GET", "/requests/" + record["id"]))
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


if __name__ == "__main__":
    import boto3
    from smoke import verify
    parser = argparse.ArgumentParser()
    parser.add_argument("--function", required=True)
    parser.add_argument("--artifact", type=Path, required=True)
    parser.add_argument("--release", required=True)
    parser.add_argument("--url", required=True)
    parser.add_argument("--region", required=True)
    args = parser.parse_args()
    print(json.dumps(release(boto3.client("lambda", region_name=args.region), args.function,
                             args.artifact.read_bytes(), args.release,
                             lambda expected: verify(args.url, args.region, expected)), indent=2))
