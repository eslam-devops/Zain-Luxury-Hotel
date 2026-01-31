variable "ecr_name" {
  description = "Name of the ECR repository"
  type        = string
  default     = "puddle-app-repo"
}

variable "s3_bucket_name" {
  description = "Name of the s3 bucket"
  type        = string
  default     = "puddle-s3-media-nti"
}

variable "vpc_cidr_block" {
  description = "The cidr for the vpc"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr_block_a" {
  description = "The cidr for the first public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "public_subnet_cidr_block_b" {
  description = "The cidr for the second public subnet"
  type        = string
  default     = "10.0.3.0/24"
}

variable "private_subnet_cidr_block_a" {
  description = "The cidr for the first private subnet"
  type        = string
  default     = "10.0.2.0/24"
}

variable "private_subnet_cidr_block_b" {
  description = "The cidr for the second private subnet"
  type        = string
  default     = "10.0.4.0/24"
}

variable "cluster_name" {
  description = "The name of the EKS cluster"
  type        = string
  default     = "puddle-eks-cluster"
}

variable "eks_version" {
  description = "The Kubernetes version for the EKS cluster"
  type        = string
  default     = "1.33"
}

variable "node_instance_type" {
  description = "Instance type for the node group"
  type        = string
  default     = "t3.small"
}

variable "node_min_size" {
  description = "Minimum number of nodes"
  type        = number
  default     = 2
}

variable "node_max_size" {
  description = "Maximum number of nodes"
  type        = number
  default     = 2
}

variable "tags" {
  description = "Tags for all resources"
  type        = map(string)
  default = {
    Environment = "Dev"
    Project     = "Puddle"
  }
}

variable "db_name" {
  description = "RDS instance identifier"
  type        = string
  default     = "puddle-db"
}

variable "db_database_name" {
  description = "Database name to create in RDS instance"
  type        = string
  default     = "puddle"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "puddle"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
  default     = "PuddleuseR123"
}

variable "db_instance_class" {
  description = "RDS instance type"
  type        = string
  default     = "db.t3.micro"
}

variable "db_engine" {
  description = "Database engine"
  type        = string
  default     = "postgres"
}

variable "db_engine_version" {
  description = "Database engine version"
  type        = string
  default     = "17.6"
}