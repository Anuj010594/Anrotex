# Copyright 2026 Anrotex IT Systems LLP.
# Learning and evaluation only: https://www.anrotex.com/downloads-policy
terraform {
  required_version = ">= 1.7, < 2.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 6.70.0"
    }
  }
}

variable "network" {
  description = "Existing Ohio test VPC, task group, two subnets in different AZs and their route tables."
  type = object({
    vpc_id                 = string
    task_security_group_id = string
    subnet_ids             = set(string)
    route_table_ids        = set(string)
  })
  validation {
    condition     = length(var.network.subnet_ids) == 2 && length(var.network.route_table_ids) == 2
    error_message = "Supply two distinct subnet IDs and two distinct route table IDs."
  }
}

variable "task_execution_role_arn" {
  description = "Existing task execution role with scoped image, logging and secret permissions."
  type        = string
  validation {
    condition     = can(regex("^arn:aws:iam::[0-9]{12}:role/.+$", var.task_execution_role_arn))
    error_message = "Supply the full AWS IAM task execution role ARN."
  }
}

provider "aws" {
  region              = "us-east-2"
  allowed_account_ids = [split(":", var.task_execution_role_arn)[4]]
}

locals {
  service_actions = {
    "ecr.api"      = ["ecr:GetAuthorizationToken", "ecr:BatchGetImage", "ecr:GetDownloadUrlForLayer", "ecr:BatchCheckLayerAvailability"]
    "ecr.dkr"      = ["ecr:GetAuthorizationToken", "ecr:BatchGetImage", "ecr:GetDownloadUrlForLayer", "ecr:BatchCheckLayerAvailability"]
    logs           = ["logs:CreateLogStream", "logs:PutLogEvents"]
    secretsmanager = ["secretsmanager:GetSecretValue"]
  }
}

resource "aws_security_group" "endpoints" {
  name_prefix = "fargate-endpoints-"
  description = "HTTPS from the supplied ECS task security group only"
  vpc_id      = var.network.vpc_id
  ingress {
    description     = "Task connections to AWS interface endpoints"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [var.network.task_security_group_id]
  }
  egress = []
}

resource "aws_vpc_endpoint" "service" {
  for_each            = local.service_actions
  vpc_id              = var.network.vpc_id
  service_name        = "com.amazonaws.us-east-2.${each.key}"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = var.network.subnet_ids
  security_group_ids  = [aws_security_group.endpoints.id]
  private_dns_enabled = true
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { AWS = var.task_execution_role_arn }
      Action    = each.value
      Resource  = "*"
    }]
  })
}

resource "aws_vpc_endpoint" "image_layers" {
  vpc_id            = var.network.vpc_id
  service_name      = "com.amazonaws.us-east-2.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = var.network.route_table_ids
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = "*"
      Action    = "s3:GetObject"
      Resource  = "arn:aws:s3:::prod-us-east-2-starport-layer-bucket/*"
    }]
  })
}
