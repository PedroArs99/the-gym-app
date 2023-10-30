variable "allocated_vcpu" {
  type = number
  default = 256
}

variable "allocated_memory" {
  type = number
  default = 512
}

variable "alb_alias" {
  type = string
  default = "the-fit-app.pro"
}

variable "app_name" {
 type = string
 default = "the-gym-app" 
}

variable "app_image_name" {
  type = string
  default = "pedroars99/the-gym-app:latest"
}

variable "aws_region" {
  type = string
  default = "eu-central-1"
}

variable "env_file_s3_arn" {
  type = string
  default = "arn:aws:s3:::the-gym-app-dev-serverlessdeploymentbucket-qbx8g5m0o1nv/.env"
}

variable "hosted_zone_id" {
  type = string
  default = "Z06360631AWO4JCHZ7K9X"
}
