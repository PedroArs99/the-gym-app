variable "aws_region" {
  type = string
  default = "eu-central-1"
}

variable "app_name" {
 type = string
 default = "the-gym-app" 
}

variable "app_image_name" {
  type = string
  default = "pedroars99/the-gym-app:latest"
}

variable "allocated_vcpu" {
  type = number
  default = 256
}

variable "allocated_memory" {
  type = number
  default = 512
}

variable "env_file_s3_arn" {
  type = string
  default = "arn:aws:s3:::the-gym-app-dev-serverlessdeploymentbucket-qbx8g5m0o1nv/.env"
}