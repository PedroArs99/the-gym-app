terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.17.0"
    }
  }

  backend "s3" {
    bucket = "the-gym-app-dev-serverlessdeploymentbucket-qbx8g5m0o1nv"
    key = ".tfstate"
    region = "eu-central-1"
  }
}

provider "aws" {
  # Configuration options
  region = var.aws_region
}