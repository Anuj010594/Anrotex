import importlib.util
from decimal import Decimal
from pathlib import Path
import subprocess
import sys
import unittest

SOURCE = Path(__file__).resolve().parents[1] / "src/content/examples/fargate_network_costs.py"
spec = importlib.util.spec_from_file_location("fargate_costs", SOURCE)
costs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(costs)


class NetworkCostsTests(unittest.TestCase):
    def test_published_output(self):
        result = subprocess.run([sys.executable, "-B", str(SOURCE)], capture_output=True, text=True, check=True)
        self.assertEqual(result.stdout, "AWS only / NAT: US$77.50\nAWS only / endpoints: US$59.40\nExternal API / NAT: US$78.40\nExternal API / NAT + endpoints: US$133.30\n")
        article = (SOURCE.parents[3] / "src/pages/blog/FargateNATGateway.tsx").read_text()
        self.assertIn('const costOutput = `' + result.stdout.rstrip() + '`;', article)

    def test_idle_month_still_has_hourly_and_public_ip_costs(self):
        self.assertEqual(costs.monthly_cost(nat=True, endpoints=False, aws_gb=0, internet_gb=0), Decimal("73.00"))
        self.assertEqual(costs.monthly_cost(nat=False, endpoints=True, aws_gb=0, internet_gb=0), Decimal("58.40"))

    def test_missing_routes_are_rejected(self):
        for nat, endpoints, aws_gb, internet_gb in [(False, True, 100, 20), (False, False, 100, 0)]:
            with self.assertRaises(ValueError):
                costs.monthly_cost(nat=nat, endpoints=endpoints, aws_gb=aws_gb, internet_gb=internet_gb)

    def test_invalid_traffic_is_rejected(self):
        for value in [-1, "NaN", "Infinity", "-Infinity"]:
            for field in ["aws_gb", "internet_gb"]:
                inputs = dict(nat=True, endpoints=True, aws_gb=0, internet_gb=0)
                inputs[field] = value
                with self.subTest(field=field, value=value), self.assertRaises(ValueError):
                    costs.monthly_cost(**inputs)

    def test_adding_endpoints_breaks_even_only_at_enough_traffic(self):
        def difference(gb):
            return costs.monthly_cost(nat=True, endpoints=True, aws_gb=gb, internet_gb=20) - costs.monthly_cost(nat=True, endpoints=False, aws_gb=gb, internet_gb=20)
        self.assertGreater(difference(1668), 0)
        self.assertLess(difference(1669), 0)
        self.assertEqual(difference(2000), Decimal("-11.60"))


if __name__ == "__main__":
    unittest.main()
