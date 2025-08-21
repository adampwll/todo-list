output "vpcs" {
    description = "VPC Outputs"
    value = { "cidr_block" : aws_vpc.vpc.cidr_block, "id" : aws_vpc.vpc.id }
}

output "private_subnet_id" {
    description = "Private subnet IDs"
    value = aws_subnet.private_subnets[0].id
}