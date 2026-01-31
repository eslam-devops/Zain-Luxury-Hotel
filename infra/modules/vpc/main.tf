locals {
  common_tags = {
    Project     = "puddle"
    Environment = "Dev"
  }
}

resource "aws_vpc" "puddle_vpc" {
  cidr_block = var.vpc_cidr_block

  tags = merge(
    local.common_tags,
    { Name = "puddle-vpc" }
  )
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_subnet" "puddle_public_subnet_a" {
  vpc_id                  = aws_vpc.puddle_vpc.id
  cidr_block              = var.public_subnet_cidr_block_a
  map_public_ip_on_launch = true
  availability_zone       = data.aws_availability_zones.available.names[0]

  tags = merge(
    local.common_tags,
    { Name = "puddle-public-subnet-a" }
  )
}

resource "aws_subnet" "puddle_public_subnet_b" {
  vpc_id                  = aws_vpc.puddle_vpc.id
  cidr_block              = var.public_subnet_cidr_block_b
  map_public_ip_on_launch = true
  availability_zone       = data.aws_availability_zones.available.names[1]

  tags = merge(
    local.common_tags,
    { Name = "puddle-public-subnet-b" }
  )
}

resource "aws_subnet" "puddle_private_subnet_a" {
  vpc_id                  = aws_vpc.puddle_vpc.id
  cidr_block              = var.private_subnet_cidr_block_a
  map_public_ip_on_launch = false
  availability_zone       = data.aws_availability_zones.available.names[0]

  tags = merge(
    local.common_tags,
    { Name = "puddle-private-subnet-a" }
  )
}

resource "aws_subnet" "puddle_private_subnet_b" {
  vpc_id                  = aws_vpc.puddle_vpc.id
  cidr_block              = var.private_subnet_cidr_block_b
  map_public_ip_on_launch = false
  availability_zone       = data.aws_availability_zones.available.names[1]

  tags = merge(
    local.common_tags,
    { Name = "puddle-private-subnet-b" }
  )
}

resource "aws_internet_gateway" "puddle_igw" {
  vpc_id = aws_vpc.puddle_vpc.id

  tags = merge(
    local.common_tags,
    { Name = "puddle-igw" }
  )
}

resource "aws_eip" "puddle_nat_eip" {
  domain = "vpc"

  tags = merge(
    local.common_tags,
    { Name = "puddle-nat-eip" }
  )
}

resource "aws_nat_gateway" "puddle_nat_gw" {
  allocation_id = aws_eip.puddle_nat_eip.id
  subnet_id     = aws_subnet.puddle_public_subnet_a.id

  tags = merge(
    local.common_tags,
    { Name = "puddle-nat-gw" }
  )
}

resource "aws_route_table" "puddle_public_route_table" {
  vpc_id = aws_vpc.puddle_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.puddle_igw.id
  }

  tags = merge(
    local.common_tags,
    { Name = "puddle-public-rt" }
  )
}

resource "aws_route_table_association" "puddle_public_route_table_association" {
  subnet_id      = aws_subnet.puddle_public_subnet_a.id
  route_table_id = aws_route_table.puddle_public_route_table.id
}

resource "aws_route_table_association" "puddle_public_route_table_association_b" {
  subnet_id      = aws_subnet.puddle_public_subnet_b.id
  route_table_id = aws_route_table.puddle_public_route_table.id
}

resource "aws_route_table" "puddle_private_route_table" {
  vpc_id = aws_vpc.puddle_vpc.id

  tags = merge(
    local.common_tags,
    { Name = "puddle-private-rt" }
  )
}

resource "aws_route_table_association" "puddle_private_route_table_association" {
  subnet_id      = aws_subnet.puddle_private_subnet_a.id
  route_table_id = aws_route_table.puddle_private_route_table.id
}

resource "aws_route_table_association" "puddle_private_route_table_association_b" {
  subnet_id      = aws_subnet.puddle_private_subnet_b.id
  route_table_id = aws_route_table.puddle_private_route_table.id
}

resource "aws_route" "private_nat_route" {
  route_table_id         = aws_route_table.puddle_private_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.puddle_nat_gw.id
}
