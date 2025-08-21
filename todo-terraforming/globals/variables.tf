variable "region" {
  type = string
  default = "us-east-1"
}

variable "aws_role_arn" {
  type = string
}

variable "aws_web_identity_token" {
  type = string
}