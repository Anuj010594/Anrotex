"""Release and download security checks. No AWS account, SDK or network required."""
from contextlib import redirect_stderr
from email.message import Message
from io import BytesIO, StringIO
import json
from types import SimpleNamespace
import unittest
from unittest.mock import Mock, patch
import urllib.request
from urllib.response import addinfourl
import release as release_script
from release import release
import smoke

BASE = "https://abc1234567.execute-api.us-east-1.amazonaws.com"
REGION = "us-east-1"
ACCOUNT = "123456789012"
RECORD = {"id": "a" * 64, "summary": "Automated gateway persistence check"}


class OfflineTests(unittest.TestCase):
    def setUp(self):
        # A regression must fail instead of making a real network connection.
        self.socket_block = patch("socket.socket", side_effect=AssertionError("Network use is forbidden in these tests"))
        self.socket_block.start()
        self.addCleanup(self.socket_block.stop)


class ReleaseTests(OfflineTests):
    def setUp(self):
        super().setUp()
        self.client = Mock()
        self.client.get_alias.return_value = {"FunctionVersion": "7", "RevisionId": "alias-before"}
        self.client.get_function.return_value = {"Configuration": {"RevisionId": "code-before"}}
        self.client.update_function_code.return_value = {"Version": "8"}
        self.client.update_alias.return_value = {"RevisionId": "alias-promoted"}
        self.check = Mock()

    def run_release(self, probe):
        return release(self.client, "operations", b"artifact", "release-001", probe, self.check)

    def test_success_promotes_only_after_candidate_check(self):
        calls = []
        self.check.side_effect = lambda *_: calls.append("candidate")
        self.client.update_alias.side_effect = lambda **_: (calls.append("alias") or {"RevisionId": "new"})
        result = self.run_release(lambda _: calls.append("gateway"))
        self.assertEqual(["candidate", "alias", "gateway"], calls)
        self.assertEqual("8", result["version"])

    def test_candidate_failure_never_changes_live_alias(self):
        self.check.side_effect = RuntimeError("bad candidate")
        with self.assertRaises(RuntimeError):
            self.run_release(Mock())
        self.client.update_alias.assert_not_called()

    def test_gateway_failure_rolls_back_previous_version(self):
        with self.assertRaises(RuntimeError):
            self.run_release(Mock(side_effect=RuntimeError("gateway failed")))
        self.assertEqual(2, self.client.update_alias.call_count)
        self.client.update_alias.assert_called_with(
            FunctionName="operations", Name="live", FunctionVersion="7", RevisionId="alias-promoted")

    def test_concurrent_alias_change_is_not_blindly_overwritten(self):
        self.client.update_alias.side_effect = RuntimeError("revision mismatch")
        probe = Mock()
        with self.assertRaises(RuntimeError):
            self.run_release(probe)
        self.assertEqual(1, self.client.update_alias.call_count)
        probe.assert_not_called()

    def test_weighted_alias_requires_operator_review(self):
        self.client.get_alias.return_value["RoutingConfig"] = {"AdditionalVersionWeights": {"6": 0.1}}
        with self.assertRaises(RuntimeError):
            self.run_release(Mock())
        self.client.update_function_code.assert_not_called()

    def test_failed_rollback_keeps_revision_guard_and_reports_failure(self):
        self.client.update_alias.side_effect = [{"RevisionId": "alias-promoted"}, RuntimeError("revision mismatch")]
        with self.assertRaisesRegex(RuntimeError, "revision mismatch"):
            self.run_release(Mock(side_effect=RuntimeError("gateway failed")))
        self.assertEqual(2, self.client.update_alias.call_count)
        self.assertEqual("alias-promoted", self.client.update_alias.call_args.kwargs["RevisionId"])


class InputTests(OfflineTests):
    def test_expected_gateway_is_accepted(self):
        smoke.validate_target(BASE, REGION)

    def test_region_cannot_change_the_url_destination(self):
        region = "us-east-1.amazonaws.com@unexpected.example/"
        url = "https://abc123.execute-api." + region + ".amazonaws.com"
        with self.assertRaises(ValueError):
            smoke.validate_target(url, region)

    def test_other_url_forms_are_rejected(self):
        for base in [BASE + "/", BASE + "?q=1", BASE + "#x", BASE + ":443", BASE + ".example.com",
                     BASE.replace("https:", "http:"), BASE.replace("https://", "https://user@"),
                     BASE.replace("us-east-1", "eu-west-1"), "https://127.0.0.1", "file:///tmp/test",
                     "\n" + BASE, BASE + "\n"]:
            with self.subTest(base=base), self.assertRaises(ValueError):
                smoke.validate_target(base, REGION)

    def test_record_id_cannot_add_a_path_or_query(self):
        for identifier in ["../health", "../admin?delete=true", "//example.com", "%2e%2e%2fhealth",
                           "a" * 64 + "/", "a" * 63, 1, None]:
            with self.subTest(identifier=identifier), self.assertRaises(RuntimeError):
                smoke.record_path({"id": identifier})
        self.assertEqual("/requests/" + RECORD["id"], smoke.record_path(RECORD))

    def test_response_size_and_shape_are_bounded(self):
        for data in [b" " * (smoke.MAX_RESPONSE_BYTES + 1), b"[]", b'"text"', b"null", b"not json"]:
            with self.subTest(data_size=len(data)), self.assertRaises((RuntimeError, ValueError)):
                smoke.read_json(BytesIO(data))
        self.assertEqual({"ok": True}, smoke.read_json(BytesIO(b'{"ok":true}')))


class CommandTests(OfflineTests):
    def release_args(self):
        return ["--function", "operations", "--artifact", "not-opened.zip", "--release", "release-001",
                "--url", BASE, "--region", REGION, "--confirm-test-account", ACCOUNT]

    def test_release_requires_account_confirmation_before_access(self):
        with patch.object(release_script, "confirmed_session") as session, redirect_stderr(StringIO()):
            with self.assertRaises(SystemExit):
                release_script.main(self.release_args()[:-2])
            session.assert_not_called()

    def test_invalid_endpoint_stops_before_reading_files_or_using_aws(self):
        args = self.release_args()
        args[args.index("--url") + 1] = "https://unexpected.example"
        with patch.object(release_script.Path, "read_bytes") as artifact, patch.object(release_script, "confirmed_session") as session:
            with self.assertRaises(ValueError):
                release_script.main(args)
            artifact.assert_not_called()
            session.assert_not_called()

    def test_cross_account_function_arn_is_rejected_before_access(self):
        args = self.release_args()
        args[1] = "arn:aws:lambda:us-east-1:999999999999:function:operations"
        with patch.object(release_script, "confirmed_session") as session:
            with self.assertRaises(ValueError):
                release_script.main(args)
            session.assert_not_called()

    def test_wrong_account_stops_before_lambda_access(self):
        with patch.object(release_script.Path, "read_bytes", return_value=b"artifact"), \
             patch.object(release_script, "confirmed_session", side_effect=RuntimeError("wrong account")), \
             patch.object(release_script, "aws_client") as client:
            with self.assertRaisesRegex(RuntimeError, "wrong account"):
                release_script.main(self.release_args())
            client.assert_not_called()

    def test_account_identity_is_checked_and_endpoint_overrides_disabled(self):
        session = Mock()
        session.client.return_value.get_caller_identity.return_value = {"Account": ACCOUNT}
        config = Mock()
        modules = {"boto3": SimpleNamespace(Session=Mock(return_value=session)),
                   "botocore.config": SimpleNamespace(Config=config)}
        with patch.dict("sys.modules", modules):
            self.assertIs(session, smoke.confirmed_session(REGION, ACCOUNT))
            config.assert_called_once_with(ignore_configured_endpoint_urls=True)
            self.assertEqual("sts", session.client.call_args.args[0])
            session.client.return_value.get_caller_identity.return_value = {"Account": "999999999999"}
            with self.assertRaisesRegex(RuntimeError, "confirmed test account"):
                smoke.confirmed_session(REGION, ACCOUNT)

    def test_gateway_command_requires_confirmation_before_access(self):
        with patch.object(smoke, "confirmed_session") as session, redirect_stderr(StringIO()):
            with self.assertRaises(SystemExit):
                smoke.main(["--url", BASE, "--region", REGION, "--release", "release-001"])
            session.assert_not_called()


class ApplicationChecks(OfflineTests):
    def test_candidate_rejects_invalid_record_before_another_invocation(self):
        responses = [BytesIO(json.dumps({"statusCode": 200, "body": json.dumps({"release": "release-001"})}).encode()),
                     BytesIO(json.dumps({"statusCode": 201, "body": json.dumps({"id": "../admin"})}).encode())]
        client = Mock()
        client.invoke.side_effect = [{"Payload": stream} for stream in responses]
        with self.assertRaisesRegex(RuntimeError, "record ID"):
            release_script.candidate_check(client, "operations", "8", "release-001")
        self.assertEqual(2, client.invoke.call_count)
        self.assertTrue(all(stream.closed for stream in responses))

    def test_candidate_error_closes_its_response(self):
        stream = BytesIO(b"error")
        client = Mock()
        client.invoke.return_value = {"Payload": stream, "FunctionError": "Unhandled"}
        with self.assertRaises(RuntimeError):
            release_script.candidate_check(client, "operations", "8", "release-001")
        self.assertTrue(stream.closed)

    def test_gateway_reuses_the_key_and_checks_the_saved_record(self):
        responses = [(403, {}), (200, {"release": "release-001"}), (201, RECORD), (200, RECORD), (200, RECORD)]
        with patch.object(smoke, "request_json", side_effect=responses) as request:
            self.assertEqual(4, smoke.verify(BASE, REGION, "release-001", Mock())["authenticated_gateway_checks"])
            calls = request.call_args_list
            self.assertEqual(calls[2].args[-1], calls[3].args[-1])
            self.assertTrue(calls[2].args[-1].startswith("smoke-"))
            self.assertEqual("/requests/" + RECORD["id"], calls[4].args[5])

    def test_gateway_stops_on_failed_auth_or_release_check(self):
        for responses in [[(200, {})], [(403, {}), (200, {"release": "wrong"})]]:
            with self.subTest(responses=responses), patch.object(smoke, "request_json", side_effect=responses) as request:
                with self.assertRaises(RuntimeError):
                    smoke.verify(BASE, REGION, "release-001", Mock())
                self.assertLessEqual(request.call_count, 2)

    def test_gateway_rejects_untrusted_record_path(self):
        record = {"id": "../admin"}
        with patch.object(smoke, "request_json", side_effect=[(403, {}), (200, {"release": "release-001"}), (201, record), (200, record)]) as request:
            with self.assertRaisesRegex(RuntimeError, "record ID"):
                smoke.verify(BASE, REGION, "release-001", Mock())
            self.assertEqual(4, request.call_count)

    def test_redirects_never_reach_another_destination(self):
        for status in [301, 302, 303, 307, 308]:
            calls = []

            class RedirectTransport(urllib.request.HTTPSHandler):
                def https_open(self, request):
                    calls.append(request.full_url)
                    headers = Message()
                    headers["Location"] = "https://unexpected.example/collect"
                    response = addinfourl(BytesIO(b""), headers, request.full_url, status)
                    response.msg = "Redirect"
                    return response

            with self.subTest(status=status):
                opener = urllib.request.build_opener(RedirectTransport(), smoke.NoRedirect())
                result = smoke.request_json(opener, BASE, REGION, None, "GET", "/health", signed=False)
                self.assertEqual((status, {}), result)
                self.assertEqual([BASE + "/health"], calls)


if __name__ == "__main__":
    unittest.main()
