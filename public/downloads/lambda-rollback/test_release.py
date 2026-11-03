"""Cloud Operations release tests. Uses mocks; no AWS account or SDK required."""
import unittest
from unittest.mock import Mock
from release import release


class ReleaseTests(unittest.TestCase):
    def setUp(self):
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


if __name__ == "__main__":
    unittest.main()
