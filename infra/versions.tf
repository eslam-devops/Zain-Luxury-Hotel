terraform {
  required_version = ">= 1.0"

  cloud {
    organization = "puddle-devops"

    workspaces {
      name = "puddle-infra"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}