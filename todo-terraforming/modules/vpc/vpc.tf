resource "aws_vpc" "vpc" {
    cidr_block = "10.0.0.0/16"

    tags = {
        Name        = "${var.project} VPC ${var.environment}"
        environment = var.environment
        project     = var.project
    }
}

resource "aws_subnet" "public_subnets" {
    count               = length(var.public_subnet_cidrs)
    vpc_id              = aws_vpc.vpc.id
    cidr_block          = element(var.public_subnet_cidrs, count.index)
    availability_zone   = element(var.azs, count.index)
    
    tags = {
        Name = "${var.project} Public Subnet ${var.environment} ${count.index +1}"
        project = var.project
        environment = var.environment
    }
}

resource "aws_subnet" "private_subnets" {
    count               = length(var.private_subnet_cidrs)
    vpc_id              = aws_vpc.vpc.id
    cidr_block          = element(var.private_subnet_cidrs, count.index)
    availability_zone   = element(var.azs, count.index)

    tags = {
        Name = "${var.project} Private Subnet ${var.environment} ${count.index +1}"
        project = var.project
        environment = var.environment
    }
}

resource "aws_internet_gateway" "gateway" {
    vpc_id = aws_vpc.vpc.id

    tags = {
      Name  = "${var.project} VPC Gateway ${var.environment}"
      environment = var.environment
      project = var.project
    }
}

resource "aws_route_table" "public_rt" {
    vpc_id = aws_vpc.vpc.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.gateway.id
    }

    tags = {
        Name = "${var.project} Public Route Table ${var.environment}"
        project = var.project
        environment = var.environment
    }
}

resource "aws_route_table_association" "public_subnet_association" {
    count = length(var.public_subnet_cidrs)
    subnet_id = element(aws_subnet.public_subnets[*].id, count.index)
    route_table_id = aws_route_table.public_rt.id
}