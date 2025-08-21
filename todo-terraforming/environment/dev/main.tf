module "vpc" {
  source = "../../modules/vpc"
  environment = var.environment
  public_subnet_cidrs = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  azs = var.azs
}

module "s3" {
  source = "../../modules/s3"
  environment = var.environment
}

module "ec2" {
  source = "../../modules/ec2"
  environment = var.environment
  private_subnet = module.vpc.private_subnet_id
}