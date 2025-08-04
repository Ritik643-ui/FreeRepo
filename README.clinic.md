# 🏥 Clinic Management System

A simple Spring Boot application for managing pets, their owners, and consultation fees, deployed on AWS EC2 with a complete CI/CD pipeline using Jenkins and Docker.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Local Development](#local-development)
- [CI/CD Pipeline](#cicd-pipeline)
- [AWS Deployment](#aws-deployment)
- [API Documentation](#api-documentation)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This project demonstrates a complete DevOps workflow for a clinic management system:

- **Backend**: Spring Boot 3.2 with Java 17
- **Database**: PostgreSQL with Flyway migrations
- **Caching**: Redis
- **Containerization**: Docker & Docker Compose
- **CI/CD**: Jenkins Pipeline
- **Cloud**: AWS EC2 deployment
- **Monitoring**: Spring Boot Actuator with Prometheus metrics

### Features

- ✅ Simple "Hello World" REST API
- ✅ Health check endpoints
- ✅ API documentation with Swagger
- ✅ Database integration ready
- ✅ Caching layer
- ✅ Security configuration
- ✅ Comprehensive logging
- ✅ Docker containerization
- ✅ CI/CD pipeline
- ✅ AWS deployment automation

## 🛠 Prerequisites

### Required Software

- **Java 17** or higher
- **Maven 3.6+**
- **Docker** and **Docker Compose**
- **AWS CLI** (for deployment)
- **Jenkins** (for CI/CD)

### AWS Requirements

- AWS Account with appropriate permissions
- AWS CLI configured with credentials
- EC2, VPC, and Security Group permissions

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Jenkins       │    │   Docker        │    │   AWS EC2       │
│   CI/CD         │───▶│   Registry      │───▶│   Production    │
│   Pipeline      │    │                 │    │   Environment   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                              │
         ▼                                              ▼
┌─────────────────┐                            ┌─────────────────┐
│   Source Code   │                            │   Load Balancer │
│   GitHub        │                            │   (Optional)    │
└─────────────────┘                            └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │   Spring Boot   │
                                               │   Application   │
                                               └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │   PostgreSQL    │
                                               │   Database      │
                                               └─────────────────┘
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd clinic-management-system
```

### 2. Run Locally with Docker

```bash
# Start all services
docker-compose -f docker-compose.clinic.yml up -d

# Check if services are running
docker-compose -f docker-compose.clinic.yml ps

# View logs
docker-compose -f docker-compose.clinic.yml logs -f clinic-backend
```

### 3. Test the Application

```bash
# Health check
curl http://localhost:8080/api/health

# Hello World endpoint
curl http://localhost:8080/

# API info
curl http://localhost:8080/api/info
```

### 4. Access Swagger UI

Open your browser and navigate to: http://localhost:8080/api/swagger-ui.html

## 💻 Local Development

### Running without Docker

1. **Start PostgreSQL and Redis**:
   ```bash
   docker-compose -f docker-compose.clinic.yml up -d clinic-db clinic-redis
   ```

2. **Run the Spring Boot application**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Run tests**:
   ```bash
   mvn test
   ```

4. **Build the application**:
   ```bash
   mvn clean package
   ```

### Development with Hot Reload

The Docker Compose setup includes hot reload for development:

```bash
# Start in development mode
docker-compose -f docker-compose.clinic.yml up -d

# Make changes to your code - they will be automatically reloaded
```

## 🔄 CI/CD Pipeline

### Jenkins Pipeline Features

- **Automated Testing**: Unit tests, integration tests
- **Code Quality**: SonarQube integration (optional)
- **Security Scanning**: OWASP dependency check
- **Docker Build**: Multi-stage Docker builds
- **Deployment**: Automated deployment to AWS EC2
- **Notifications**: Slack notifications on success/failure

### Pipeline Stages

1. **Checkout**: Clone source code
2. **Build & Test**: Maven build and test execution
3. **Code Quality**: Static analysis and security scans
4. **Docker Build**: Create Docker images
5. **Docker Push**: Push to registry (for main/staging branches)
6. **Deploy**: Deploy to AWS EC2 (for main/staging branches)
7. **Integration Tests**: Post-deployment testing
8. **Performance Tests**: Load testing (for main branch)

### Setting up Jenkins

1. **Install Jenkins** with required plugins:
   - Docker Pipeline
   - AWS Steps
   - Slack Notification

2. **Configure Credentials**:
   - `docker-registry-credentials`: Docker registry login
   - `aws-credentials`: AWS access keys
   - `ec2-ssh-key`: SSH key for EC2 access
   - `database-url`: Production database URL
   - `jwt-secret`: JWT signing secret
   - `slack-webhook`: Slack webhook URL

3. **Create Pipeline**:
   - Use `Jenkinsfile.clinic` as the pipeline script
   - Configure webhook for automatic builds

## ☁️ AWS Deployment

### Automated Infrastructure Setup

Run the AWS setup script to create all required infrastructure:

```bash
cd infrastructure
chmod +x aws-setup.sh
./aws-setup.sh
```

This script will:
- Create EC2 key pair
- Set up security groups
- Launch EC2 instance
- Install Docker, Java, and other dependencies
- Create deployment scripts

### Manual Deployment

If you prefer manual deployment:

1. **Launch EC2 Instance**:
   - AMI: Amazon Linux 2023
   - Instance Type: t3.medium (minimum)
   - Security Group: Allow ports 22, 80, 443, 8080

2. **Install Dependencies**:
   ```bash
   sudo yum update -y
   sudo yum install -y docker java-17-amazon-corretto
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -a -G docker ec2-user
   ```

3. **Deploy Application**:
   ```bash
   # Copy your application files to the instance
   scp -i your-key.pem -r . ec2-user@your-instance-ip:/opt/clinic-management/
   
   # SSH to the instance and start services
   ssh -i your-key.pem ec2-user@your-instance-ip
   cd /opt/clinic-management
   docker-compose -f docker-compose.clinic.yml up -d
   ```

### Environment Variables for Production

Set these environment variables on your EC2 instance:

```bash
export SPRING_PROFILES_ACTIVE=production
export DATABASE_URL=jdbc:postgresql://your-db-host:5432/clinic_db
export DATABASE_USERNAME=your-db-user
export DATABASE_PASSWORD=your-db-password
export JWT_SECRET=your-production-jwt-secret
export REDIS_HOST=your-redis-host
export CORS_ALLOWED_ORIGINS=https://your-domain.com
```

## 📚 API Documentation

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Hello World message |
| GET | `/health` | Application health status |
| GET | `/api/info` | Application information |
| GET | `/api/actuator/health` | Detailed health check |
| GET | `/api/actuator/metrics` | Application metrics |
| GET | `/api/swagger-ui.html` | API documentation |

### Example API Calls

```bash
# Basic health check
curl http://your-server:8080/api/health

# Get application info
curl http://your-server:8080/api/info

# Get detailed metrics
curl http://your-server:8080/api/actuator/metrics
```

## 📊 Monitoring

### Health Checks

The application provides multiple health check endpoints:

- `/api/health` - Simple health status
- `/api/actuator/health` - Detailed health information
- `/api/actuator/metrics` - Application metrics

### Prometheus Metrics

Metrics are available at `/api/actuator/prometheus` for Prometheus scraping.

### Logging

Logs are configured with different levels:
- **Development**: DEBUG level with console output
- **Production**: INFO level with file output to `/var/log/clinic/`

## 🔧 Troubleshooting

### Common Issues

1. **Application won't start**:
   ```bash
   # Check logs
   docker-compose -f docker-compose.clinic.yml logs clinic-backend
   
   # Check if database is running
   docker-compose -f docker-compose.clinic.yml ps
   ```

2. **Database connection issues**:
   ```bash
   # Test database connectivity
   docker exec -it clinic-postgres psql -U clinic_user -d clinic_db -c "SELECT 1;"
   ```

3. **Port conflicts**:
   ```bash
   # Check what's using port 8080
   lsof -i :8080
   
   # Stop conflicting services
   sudo systemctl stop <service-name>
   ```

4. **Docker issues**:
   ```bash
   # Clean up Docker
   docker system prune -a
   
   # Rebuild images
   docker-compose -f docker-compose.clinic.yml build --no-cache
   ```

### Performance Tuning

For production environments:

1. **JVM Settings**:
   ```bash
   export JAVA_OPTS="-Xmx1g -Xms512m -XX:+UseG1GC"
   ```

2. **Database Connection Pool**:
   ```yaml
   spring:
     datasource:
       hikari:
         maximum-pool-size: 20
         minimum-idle: 5
   ```

3. **Redis Configuration**:
   ```yaml
   spring:
     data:
       redis:
         lettuce:
           pool:
             max-active: 8
             max-idle: 8
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the logs for error details

---

**Happy Coding! 🏥✨**
