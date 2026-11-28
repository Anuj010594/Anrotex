# Copyright 2026 Anrotex IT Systems LLP.
# Learning and evaluation only: https://www.anrotex.com/downloads-policy
from decimal import Decimal


def monthly_cost(*, nat, endpoints, aws_gb, internet_gb):
    """Ohio rates checked 28 November 2026; two AZs, 730 hours.

    aws_gb is traffic through the four interface services, not S3 layers.
    Both designs use an S3 gateway endpoint. Transfer and app costs are extra.
    The interface rate assumes the first 1 PB monthly pricing tier.
    """
    aws_gb, internet_gb = Decimal(str(aws_gb)), Decimal(str(internet_gb))
    if any(not value.is_finite() or value < 0 for value in (aws_gb, internet_gb)):
        raise ValueError("Traffic must be finite and non-negative.")
    if internet_gb and not nat:
        raise ValueError("This design has no route to the external IPv4 API.")
    if aws_gb and not (nat or endpoints):
        raise ValueError("Choose a route to the AWS services.")
    total = Decimal("0")
    if nat:
        total += 2 * 730 * (Decimal("0.045") + Decimal("0.005"))
        total += (internet_gb + (0 if endpoints else aws_gb)) * Decimal("0.045")
    if endpoints:
        total += 4 * 2 * 730 * Decimal("0.01")
        total += aws_gb * Decimal("0.01")
    return total.quantize(Decimal("0.01"))


if __name__ == "__main__":
    for label, nat, endpoints, internet_gb in [
        ("AWS only / NAT", True, False, 0),
        ("AWS only / endpoints", False, True, 0),
        ("External API / NAT", True, False, 20),
        ("External API / NAT + endpoints", True, True, 20),
    ]:
        cost = monthly_cost(nat=nat, endpoints=endpoints, aws_gb=100, internet_gb=internet_gb)
        print(f"{label}: US${cost}")
