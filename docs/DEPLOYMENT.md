# TravelBuddy Deployment Guide

This guide provides comprehensive instructions for deploying TravelBuddy in various environments.

## Prerequisites

### Required Tools
- Docker & Docker Compose
- AWS CLI (for cloud deployment)
- Jenkins (for CI/CD)
- Git
- Node.js 18+
- Java 17+
- Maven 3.9+

### Required Accounts
- AWS Account with appropriate permissions
- Docker Hub or AWS ECR account
- Domain name (for production)
- SSL certificate (for production)

## Local Development Deployment

### Quick Start with Docker Compose

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/travelbuddy.git
   cd travelbuddy
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - API Documentation: http://localhost:8080/swagger-ui.html
   - Database Admin: http://localhost:8081 (Adminer)

### Manual Development Setup

#### Backend Setup
```bash
cd backend
./mvnw spring-boot:run
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Production Deployment on AWS

### Infrastructure Setup

#### 1. VPC and Networking
```bash
# Create VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=travelbuddy-vpc}]'

# Create subnets
aws ec2 create-subnet --vpc-id vpc-xxxxxxxx --cidr-block 10.0.1.0/24 --availability-zone us-east-1a
aws ec2 create-subnet --vpc-id vpc-xxxxxxxx --cidr-block 10.0.2.0/24 --availability-zone us-east-1b
```

#### 2. RDS Database Setup
```bash
# Create DB subnet group
aws rds create-db-subnet-group \
    --db-subnet-group-name travelbuddy-db-subnet-group \
    --db-subnet-group-description "TravelBuddy DB Subnet Group" \
    --subnet-ids subnet-xxxxxxxx subnet-yyyyyyyy

# Create RDS instance
aws rds create-db-instance \
    --db-instance-identifier travelbuddy-db \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --engine-version 15.4 \
    --master-username travelbuddy_user \
    --master-user-password your-secure-password \
    --allocated-storage 20 \
    --db-subnet-group-name travelbuddy-db-subnet-group \
    --vpc-security-group-ids sg-xxxxxxxx
```

#### 3. ElastiCache Redis Setup
```bash
# Create cache subnet group
aws elasticache create-cache-subnet-group \
    --cache-subnet-group-name travelbuddy-cache-subnet-group \
    --cache-subnet-group-description "TravelBuddy Cache Subnet Group" \
    --subnet-ids subnet-xxxxxxxx subnet-yyyyyyyy

# Create Redis cluster
aws elasticache create-cache-cluster \
    --cache-cluster-id travelbuddy-redis \
    --engine redis \
    --cache-node-type cache.t3.micro \
    --num-cache-nodes 1 \
    --cache-subnet-group-name travelbuddy-cache-subnet-group \
    --security-group-ids sg-xxxxxxxx
```

#### 4. ECS Cluster Setup
```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name travelbuddy-cluster

# Create task execution role
aws iam create-role \
    --role-name ecsTaskExecutionRole \
    --assume-role-policy-document file://ecs-task-execution-role.json

aws iam attach-role-policy \
    --role-name ecsTaskExecutionRole \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
```

### Application Deployment

#### 1. Build and Push Docker Images
```bash
# Build backend image
cd backend
docker build -t your-registry/travelbuddy-backend:latest .
docker push your-registry/travelbuddy-backend:latest

# Build frontend image
cd ../frontend
docker build -t your-registry/travelbuddy-frontend:latest .
docker push your-registry/travelbuddy-frontend:latest
```

#### 2. Create ECS Task Definitions

**Backend Task Definition (backend-task-definition.json)**
```json
{
  "family": "travelbuddy-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "travelbuddy-backend",
      "image": "your-registry/travelbuddy-backend:latest",
      "portMappings": [
        {
          "containerPort": 8080,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "SPRING_PROFILES_ACTIVE",
          "value": "production"
        },
        {
          "name": "SPRING_DATASOURCE_URL",
          "value": "jdbc:postgresql://your-rds-endpoint:5432/travelbuddy"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/travelbuddy-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

#### 3. Create ECS Services
```bash
# Register task definitions
aws ecs register-task-definition --cli-input-json file://backend-task-definition.json
aws ecs register-task-definition --cli-input-json file://frontend-task-definition.json

# Create services
aws ecs create-service \
    --cluster travelbuddy-cluster \
    --service-name travelbuddy-backend-service \
    --task-definition travelbuddy-backend \
    --desired-count 2 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxxxxx,subnet-yyyyyyyy],securityGroups=[sg-xxxxxxxx],assignPublicIp=ENABLED}"
```

#### 4. Application Load Balancer Setup
```bash
# Create ALB
aws elbv2 create-load-balancer \
    --name travelbuddy-alb \
    --subnets subnet-xxxxxxxx subnet-yyyyyyyy \
    --security-groups sg-xxxxxxxx

# Create target groups
aws elbv2 create-target-group \
    --name travelbuddy-backend-tg \
    --protocol HTTP \
    --port 8080 \
    --vpc-id vpc-xxxxxxxx \
    --target-type ip \
    --health-check-path /api/actuator/health
```

## Environment Configuration

### Environment Variables

#### Backend Environment Variables
```bash
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/travelbuddy
SPRING_DATASOURCE_USERNAME=travelbuddy_user
SPRING_DATASOURCE_PASSWORD=secure_password

# Redis Configuration
SPRING_REDIS_HOST=localhost
SPRING_REDIS_PORT=6379
SPRING_REDIS_PASSWORD=redis_password

# JWT Configuration
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRATION=86400000

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# Payment Gateway
PAYMENT_GATEWAY_URL=https://api.paymentgateway.com
PAYMENT_API_KEY=your-payment-api-key

# AWS Configuration (for production)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

#### Frontend Environment Variables
```bash
# API Configuration
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENVIRONMENT=development

# Feature Flags
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_ANALYTICS=false

# Third-party Services
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-key
REACT_APP_STRIPE_PUBLISHABLE_KEY=your-stripe-key
```

## SSL/TLS Configuration

### Let's Encrypt with Certbot
```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal setup
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### AWS Certificate Manager
```bash
# Request certificate
aws acm request-certificate \
    --domain-name yourdomain.com \
    --subject-alternative-names www.yourdomain.com \
    --validation-method DNS
```

## Monitoring and Logging

### CloudWatch Setup
```bash
# Create log groups
aws logs create-log-group --log-group-name /ecs/travelbuddy-backend
aws logs create-log-group --log-group-name /ecs/travelbuddy-frontend

# Create CloudWatch dashboard
aws cloudwatch put-dashboard \
    --dashboard-name TravelBuddy \
    --dashboard-body file://cloudwatch-dashboard.json
```

### Prometheus and Grafana Setup
```bash
# Deploy monitoring stack
docker-compose -f docker-compose.monitoring.yml up -d

# Access Grafana
# URL: http://localhost:3001
# Username: admin
# Password: admin (change on first login)
```

## Backup and Recovery

### Database Backup
```bash
# Create backup script
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="travelbuddy"

# Create backup
pg_dump -h localhost -U travelbuddy_user -d $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Upload to S3
aws s3 cp $BACKUP_DIR/backup_$DATE.sql s3://your-backup-bucket/database/

# Cleanup old backups (keep last 7 days)
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

### Automated Backup with Cron
```bash
# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

## Scaling and Performance

### Auto Scaling Configuration
```bash
# Create auto scaling target
aws application-autoscaling register-scalable-target \
    --service-namespace ecs \
    --resource-id service/travelbuddy-cluster/travelbuddy-backend-service \
    --scalable-dimension ecs:service:DesiredCount \
    --min-capacity 2 \
    --max-capacity 10

# Create scaling policy
aws application-autoscaling put-scaling-policy \
    --policy-name travelbuddy-backend-scaling-policy \
    --service-namespace ecs \
    --resource-id service/travelbuddy-cluster/travelbuddy-backend-service \
    --scalable-dimension ecs:service:DesiredCount \
    --policy-type TargetTrackingScaling \
    --target-tracking-scaling-policy-configuration file://scaling-policy.json
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Issues
```bash
# Check database connectivity
telnet your-rds-endpoint 5432

# Check security groups
aws ec2 describe-security-groups --group-ids sg-xxxxxxxx

# Check database logs
aws rds describe-db-log-files --db-instance-identifier travelbuddy-db
```

#### 2. Container Health Check Failures
```bash
# Check ECS service events
aws ecs describe-services --cluster travelbuddy-cluster --services travelbuddy-backend-service

# Check container logs
aws logs get-log-events --log-group-name /ecs/travelbuddy-backend --log-stream-name ecs/container-name/task-id
```

#### 3. Load Balancer Issues
```bash
# Check target group health
aws elbv2 describe-target-health --target-group-arn arn:aws:elasticloadbalancing:region:account:targetgroup/name

# Check ALB access logs
aws s3 ls s3://your-alb-logs-bucket/
```

### Performance Optimization

#### Database Optimization
```sql
-- Check slow queries
SELECT query, mean_time, calls, total_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Create indexes for common queries
CREATE INDEX CONCURRENTLY idx_bookings_user_status ON bookings(user_id, status);
CREATE INDEX CONCURRENTLY idx_bookings_travel_date ON bookings(travel_date);
```

#### Application Optimization
```bash
# JVM tuning for production
JAVA_OPTS="-Xmx2g -Xms1g -XX:+UseG1GC -XX:MaxGCPauseMillis=200"

# Enable JVM metrics
JAVA_OPTS="$JAVA_OPTS -javaagent:jmx_prometheus_javaagent.jar=8081:config.yaml"
```

## Security Checklist

### Pre-deployment Security Checks
- [ ] All secrets stored in AWS Secrets Manager or environment variables
- [ ] Database credentials rotated and secured
- [ ] Security groups configured with minimal required access
- [ ] SSL/TLS certificates installed and configured
- [ ] WAF rules configured for web application firewall
- [ ] VPC flow logs enabled
- [ ] CloudTrail logging enabled
- [ ] IAM roles follow principle of least privilege
- [ ] Container images scanned for vulnerabilities
- [ ] API rate limiting configured

### Post-deployment Security Monitoring
- [ ] CloudWatch security alarms configured
- [ ] AWS Config rules for compliance monitoring
- [ ] Regular security assessments scheduled
- [ ] Incident response plan documented
- [ ] Backup and recovery procedures tested

## Maintenance

### Regular Maintenance Tasks
1. **Weekly**: Review application logs and metrics
2. **Monthly**: Update dependencies and security patches
3. **Quarterly**: Performance review and optimization
4. **Annually**: Security audit and penetration testing

### Update Procedures
```bash
# Rolling update for ECS services
aws ecs update-service \
    --cluster travelbuddy-cluster \
    --service travelbuddy-backend-service \
    --force-new-deployment

# Database migration
cd backend
./mvnw flyway:migrate -Dflyway.url=jdbc:postgresql://prod-db:5432/travelbuddy
```

