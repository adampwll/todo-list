variable "environment" {
    type = string
}

variable "project" {
    type = string
    default = "todo-list"
}

variable "public_subnet_cidrs" {
    type = list(string)
    description = "Public Subnet CIDR values"
}

variable "private_subnet_cidrs" {
    type = list(string)
    description = "Private Subnet CIDR values"
}

variable "azs" {
    type        = list(string)
    description = "Availability Zones"
}