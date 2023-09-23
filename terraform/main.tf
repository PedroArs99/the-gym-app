// Networking -------------------------------------------------------------------------------------
resource "aws_vpc" "main" {
 cidr_block = "10.0.0.0/16"

 tags = {
   Name = var.app_name
 }
}

resource "aws_subnet" "public_subnet" {
  vpc_id = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = var.app_name
  }
}

resource "aws_internet_gateway" "gw" {
 vpc_id = aws_vpc.main.id
 
 tags = {
   Name = var.app_name
 }
}

resource "aws_route_table" "vpc_main_route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = var.app_name
  }
}

resource "aws_main_route_table_association" "vpc_custom_main_rt_association" {
  vpc_id         = aws_vpc.main.id
  route_table_id = aws_route_table.vpc_main_route_table.id
}

// ECS --------------------------------------------------------------------------------------------
resource "aws_ecs_cluster" "main" {
  name = var.app_name
}

resource "aws_ecs_service" "the-gym-app" {
  name = var.app_name
  cluster = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.the-gym-app-task_definition.id
  launch_type = "FARGATE"
  desired_count = 1
  network_configuration {
    subnets = [ aws_subnet.public_subnet.id ]
    assign_public_ip = true
  }
}

resource "aws_ecs_task_definition" "the-gym-app-task_definition" {
  family = var.app_name
  requires_compatibilities = [ "FARGATE" ]
  network_mode = "awsvpc"
  cpu = var.allocated_vcpu
  memory = var.allocated_memory
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture = "ARM64"
  }

  container_definitions = jsonencode([
    {
      name = var.app_name
      image: var.app_image_name
      cpu = var.allocated_vcpu
      memory = var.allocated_memory
      environmentFiles = [
        {
          type = "s3"
          value = var.env_file_s3_arn
        }
      ]
      portMappings = [
        {
          containerPort = 3000
          hostPort = 3000
        }
      ]
    }
  ])
}