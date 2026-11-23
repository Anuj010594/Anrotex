"""Run the downloadable release code with local responses and verify the video facts."""
from contextlib import redirect_stdout
from datetime import datetime, timezone
from hashlib import sha256
from io import BytesIO, StringIO
import json
from pathlib import Path
import sys
from unittest.mock import Mock, patch

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "public/downloads/lambda-rollback"
sys.path.insert(0, str(SOURCE))
from release import release  # noqa: E402
import smoke  # noqa: E402


def capture():
    client = Mock()
    live = {"version": "7", "revision": "before"}
    events = [{"step": "starting_version", "version": live["version"]}]
    client.get_alias.side_effect = lambda **_: {
        "FunctionVersion": live["version"], "RevisionId": live["revision"]}
    client.get_function.return_value = {"Configuration": {"RevisionId": "code-before"}}
    client.update_function_code.return_value = {"Version": "8"}

    def change_alias(**args):
        assert args["RevisionId"] == live["revision"], "Must not overwrite another release"
        live.update(version=args["FunctionVersion"], revision="after-" + args["FunctionVersion"])
        events.append({"step": "alias_changed", "version": live["version"]})
        return {"RevisionId": live["revision"]}

    client.update_alias.side_effect = change_alias
    candidate_record = {"id": "a" * 64, "summary": "Automated release persistence check"}
    responses = [(200, {"release": "demo-v8"}), (201, candidate_record), (200, candidate_record)]

    def invoke(**args):
        assert args["Qualifier"] == "8"
        assert live["version"] == "7", "Candidate checks must precede promotion"
        payload = json.loads(args["Payload"])
        status, body = responses.pop(0)
        events.append({"step": "candidate_check", "path": payload["rawPath"], "status": status})
        return {"Payload": BytesIO(json.dumps({"statusCode": status, "body": json.dumps(body)}).encode())}

    client.invoke.side_effect = invoke
    session = Mock()
    base = "https://abc1234567.execute-api.us-east-1.amazonaws.com"

    def failed_gateway(expected):
        assert live["version"] == "8"
        with patch.object(smoke, "request_json", side_effect=[(403, {}), (500, {"error": "deliberate failure"})]) as request:
            try:
                smoke.verify(base, "us-east-1", expected, session)
            finally:
                assert request.call_count == 2
                events.append({"step": "gateway_check", "version": "8", "status": 500})

    # No test path can open a network socket, even if the release code regresses.
    with patch("socket.socket", side_effect=AssertionError("Network access is blocked in this demonstration")):
        with redirect_stdout(StringIO()) as release_output:
            try:
                release(client, "operations", b"local-demo-artifact", "demo-v8", failed_gateway)
            except RuntimeError as error:
                assert str(error) == "Gateway release mismatch"
                events.append({"step": "release_failed", "reason": str(error)})
            else:
                raise AssertionError("The failed release must not be reported as successful")
        assert not responses
        assert live["version"] == "7"
        assert [call.kwargs["FunctionVersion"] for call in client.update_alias.call_args_list] == ["8", "7"]
        assert client.update_alias.call_args.kwargs["RevisionId"] == "after-8"
        assert json.loads(release_output.getvalue()) == {"event": "rollback", "restored_version": "7"}

        # This separate check is deliberately outside release(): restoring an alias is not enough.
        record = {"id": "b" * 64, "summary": "Automated gateway persistence check"}
        restored_responses = [(403, {}), (200, {"release": "demo-v7"}), (201, record), (200, record), (200, record)]
        with patch.object(smoke, "request_json", side_effect=restored_responses) as request:
            recovered = smoke.verify(base, "us-east-1", "demo-v7", session)
            assert recovered["authenticated_gateway_checks"] == 4
            assert request.call_count == 5
            assert request.call_args_list[2].args[-1] == request.call_args_list[3].args[-1]
        events.append({"step": "recovery_checked_separately", "version": "7", "authenticated_checks": 4,
                       "unsigned_request_denied": True})

    return {"recorded_at": datetime.now(timezone.utc).isoformat(), "environment": "local",
            "aws_responses": "simulated", "network_access": "blocked",
            "starting_version": "7", "candidate_version": "8", "final_version": live["version"],
            "release_status": "failed", "recovery_checked_separately": True,
            "source_sha256": {name: sha256((SOURCE / name).read_bytes()).hexdigest()
                              for name in ["release.py", "smoke.py"]}, "events": events}


if __name__ == "__main__":
    print(json.dumps(capture(), indent=2))
