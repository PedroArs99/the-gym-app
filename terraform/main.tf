// Networking -------------------------------------------------------------------------------------
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = var.app_name
  }
}

resource "aws_subnet" "public_subnet_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a"

  tags = {
    Name = var.app_name
  }
}

resource "aws_subnet" "public_subnet_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${var.aws_region}b"


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

resource "aws_route53_record" "www" {
  zone_id = var.hosted_zone_id
  name    = var.alb_alias
  type    = "A"

  alias {
    name                   = aws_alb.application_load_balancer.dns_name
    zone_id                = aws_alb.application_load_balancer.zone_id
    evaluate_target_health = true
  }
}

// ALB
resource "aws_alb" "application_load_balancer" {
  name               = var.app_name
  load_balancer_type = "application"
  subnets = [
    aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id
  ]
  # security group
  security_groups = ["${aws_security_group.load_balancer_security_group.id}"]

  tags = {
    Name = var.app_name
  }
}

resource "aws_security_group" "load_balancer_security_group" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow traffic in from all sources
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = var.app_name
  }
}

resource "aws_lb_target_group" "alb_target_group" {
  name        = var.app_name
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = var.app_name
  }
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_alb.application_load_balancer.arn
  port              = "80"
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.alb_target_group.arn
  }

  tags = {
    Name = var.app_name
  }
}

// ECS --------------------------------------------------------------------------------------------
resource "aws_ecs_cluster" "main" {
  name = var.app_name

  tags = {
    Name = var.app_name
  }
}

resource "aws_ecs_service" "the-gym-app" {
  name                 = var.app_name
  cluster              = aws_ecs_cluster.main.id
  task_definition      = aws_ecs_task_definition.the-gym-app-task_definition.id
  launch_type          = "FARGATE"
  desired_count        = 1
  force_new_deployment = true

  load_balancer {
    target_group_arn = aws_lb_target_group.alb_target_group.arn
    container_name   = aws_ecs_task_definition.the-gym-app-task_definition.family
    container_port   = 3000 # Specify the container port
  }

  network_configuration {
    subnets = [
      aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id
    ]
    security_groups  = [aws_security_group.the-gym-app-sg.id]
    assign_public_ip = true
  }

  tags = {
    Name = var.app_name
  }
}

resource "aws_ecs_task_definition" "the-gym-app-task_definition" {
  family                   = var.app_name
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.allocated_vcpu
  memory                   = var.allocated_memory
  task_role_arn            = aws_iam_role.the-gym-app-task-role.arn
  execution_role_arn       = aws_iam_role.the-gym-app-task-role.arn

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "ARM64"
  }

  container_definitions = jsonencode([
    {
      name = var.app_name
      image : var.app_image_name
      cpu    = var.allocated_vcpu
      memory = var.allocated_memory
      environmentFiles = [
        {
          type  = "s3"
          value = var.env_file_s3_arn
        }
      ]
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
    }
  ])
}

resource "aws_security_group" "the-gym-app-sg" {
  name        = "${var.app_name}-task-sg"
  description = "Allow traffic on the port 3000"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "Only allow traffic from the designed ALB"
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    security_groups = [aws_security_group.load_balancer_security_group.id]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = var.app_name
  }
}

resource "aws_iam_role" "the-gym-app-task-role" {
  name = "${var.app_name}-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Sid = ""
      },
    ]
  })

  inline_policy {
    name = "${var.app_name}-task-s3-access"

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = ["s3:Get*"]
          Effect   = "Allow"
          Resource = var.env_file_s3_arn
        }
      ]
    })
  }

  tags = {
    Name = var.app_name
  }
}
