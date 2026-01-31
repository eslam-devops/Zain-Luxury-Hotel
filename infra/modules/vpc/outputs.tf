output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.puddle_vpc.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = [
    aws_subnet.puddle_public_subnet_a.id,
    aws_subnet.puddle_public_subnet_b.id,
  ]
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = [
    aws_subnet.puddle_private_subnet_a.id,
    aws_subnet.puddle_private_subnet_b.id,
  ]
}

output "internet_gateway_id" {
  description = "Internet Gateway ID"
  value       = aws_internet_gateway.puddle_igw.id
}

output "nat_eip_id" {
  description = "Elastic IP"
  value       = aws_eip.puddle_nat_eip.id
}

output "nat_gateway_id" {
  description = "NAT Gateway ID"
  value       = aws_nat_gateway.puddle_nat_gw.id
}

output "public_route_table_id" {
  description = "Public route table ID"
  value       = aws_route_table.puddle_public_route_table.id
}

output "private_route_table_id" {
  description = "Private route table ID"
  value       = aws_route_table.puddle_private_route_table.id
}
