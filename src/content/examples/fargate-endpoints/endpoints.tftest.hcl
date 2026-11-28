# Copyright 2026 Anrotex IT Systems LLP.
# Learning and evaluation only: https://www.anrotex.com/downloads-policy
mock_provider "aws" {}

variables {
  network = {
    vpc_id                 = "vpc-00000000000000001"
    task_security_group_id = "sg-00000000000000001"
    subnet_ids             = ["subnet-00000000000000001", "subnet-00000000000000002"]
    route_table_ids        = ["rtb-00000000000000001", "rtb-00000000000000002"]
  }
  task_execution_role_arn = "arn:aws:iam::123456789012:role/test-task-execution"
}

run "private_service_connections" {
  command = plan
  assert {
    condition     = toset(keys(aws_vpc_endpoint.service)) == toset(["ecr.api", "ecr.dkr", "logs", "secretsmanager"])
    error_message = "Keep all four services required by this application."
  }
  assert {
    condition     = alltrue([for endpoint in aws_vpc_endpoint.service : endpoint.private_dns_enabled && length(endpoint.subnet_ids) == 2 && endpoint.vpc_endpoint_type == "Interface"])
    error_message = "Each interface endpoint needs private DNS and both test subnets."
  }
  assert {
    condition     = length(aws_security_group.endpoints.ingress) == 1 && alltrue([for rule in aws_security_group.endpoints.ingress : rule.from_port == 443 && rule.to_port == 443 && rule.protocol == "tcp" && rule.security_groups == toset([var.network.task_security_group_id]) && length(coalesce(rule.cidr_blocks, [])) == 0 && length(coalesce(rule.ipv6_cidr_blocks, [])) == 0])
    error_message = "Only the task security group may initiate HTTPS connections."
  }
  assert {
    condition     = alltrue([for endpoint in aws_vpc_endpoint.service : jsondecode(endpoint.policy).Statement[0].Principal.AWS == var.task_execution_role_arn])
    error_message = "Interface policies must stay limited to the supplied execution role."
  }
  assert {
    condition     = aws_vpc_endpoint.image_layers.route_table_ids == var.network.route_table_ids && jsondecode(aws_vpc_endpoint.image_layers.policy).Statement[0].Resource == "arn:aws:s3:::prod-us-east-2-starport-layer-bucket/*" && jsondecode(aws_vpc_endpoint.image_layers.policy).Statement[0].Action == "s3:GetObject"
    error_message = "Both route tables need read access to the regional ECR layer bucket."
  }
}

run "reject_one_subnet" {
  command = plan
  variables {
    network = {
      vpc_id                 = "vpc-00000000000000001"
      task_security_group_id = "sg-00000000000000001"
      subnet_ids             = ["subnet-00000000000000001"]
      route_table_ids        = ["rtb-00000000000000001", "rtb-00000000000000002"]
    }
  }
  expect_failures = [var.network]
}
