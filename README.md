# 🌟 TravelBuddy - Complete Travel Booking Platform

A comprehensive full-stack travel booking application built with React Expo frontend, Java Spring Boot backend, containerized with Docker, and deployed on AWS with CI/CD pipeline.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Expo    │    │  Spring Boot    │    │   PostgreSQL    │
│   Frontend      │◄──►│    Backend      │◄──►│    Database     │
│  (Mobile/Web)   │    │   (REST API)    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Docker        │
                    │  Containers     │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   AWS Cloud     │
                    │  (ECS + RDS)    │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Jenkins       │
                    │   CI/CD         │
                    └─────────────────┘
```

## 🚀 Features

### Core Functionality
- **Multi-Transport Booking**: Flights, Trains, Buses, Hotels
- **User Management**: Registration, Authentication, Profile Management
- **Search & Filter**: Advanced search with multiple criteria
- **Booking Management**: Create, View, Modify, Cancel bookings
- **Payment Integration**: Secure payment processing (ready for integration)
- **Real-time Updates**: Live booking status and notifications

### Technical Features
- **Cross-Platform**: Single codebase for mobile and web
- **Responsive Design**: Mobile-first approach
- **RESTful APIs**: Clean and documented API endpoints
- **JWT Authentication**: Secure token-based authentication
- **Database Optimization**: Indexed queries and efficient data modeling
- **Containerized Deployment**: Docker containers for easy deployment
- **Cloud-Native**: AWS-ready with auto-scaling capabilities
- **CI/CD Pipeline**: Automated testing and deployment

## 📁 Project Structure

```
travelbuddy/
├── frontend/                 # React Expo Application
│   ├── src/
│   │   ├── screens/         # Screen components
│   │   ├── components/      # Reusable UI components
│   │   ├── services/        # API integration
│   │   ├── store/           # State management
│   │   └── navigation/      # Navigation configuration
│   ├── App.tsx
│   └── package.json
├── backend/                  # Spring Boot Application
│   ├── src/main/java/com/travelbuddy/
│   │   ├── entity/          # JPA entities
│   │   ├── repository/      # Data access layer
│   │   ├── service/         # Business logic
│   │   ├── controller/      # REST controllers
│   │   └── config/          # Configuration classes
│   ├── src/main/resources/
│   │   ├── application.yml  # Application configuration
│   │   └── db/migration/    # Database migrations
│   └── pom.xml
├── infrastructure/           # Infrastructure as Code
│   ├── aws/                 # AWS CloudFormation templates
│   ├── docker/              # Docker configurations
│   └── jenkins/             # CI/CD pipeline scripts
├── docs/                    # Documentation
│   ├── API.md              # API documentation
│   ├── ARCHITECTURE.md     # System architecture
│   └── DEPLOYMENT.md       # Deployment guide
├── tests/                   # Testing configurations
│   ├── e2e/                # End-to-end tests
│   └── api/                # API tests
├── docker-compose.yml       # Local development setup
├── Jenkinsfile             # CI/CD pipeline definition
└── README.md               # This file
```

## 🛠️ Technology Stack

### Frontend
- **React Expo**: Cross-platform mobile and web development
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
- **Redux Toolkit**: State management
- **React Native Elements**: UI component library
- **Axios**: HTTP client for API calls

### Backend
- **Java 17**: Programming language
- **Spring Boot 3.x**: Application framework
- **Spring Security**: Authentication and authorization
- **Spring Data JPA**: Data access layer
- **PostgreSQL**: Primary database
- **Maven**: Build tool
- **Swagger/OpenAPI**: API documentation

### Infrastructure
- **Docker**: Containerization
- **AWS ECS**: Container orchestration
- **AWS RDS**: Managed PostgreSQL database
- **AWS ALB**: Application Load Balancer
- **AWS CloudWatch**: Monitoring and logging
- **Jenkins**: CI/CD pipeline

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Java 17+
- Docker & Docker Compose
- AWS CLI (for deployment)
- Jenkins (for CI/CD)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/travelbuddy.git
   cd travelbuddy
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - API Documentation: http://localhost:8080/swagger-ui.html

### Manual Setup

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

## 📚 Documentation

- [API Documentation](docs/API.md)
- [Architecture Guide](docs/ARCHITECTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Development Setup](docs/DEVELOPMENT.md)
- [User Guide](docs/USER_GUIDE.md)

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
./mvnw test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

### Run E2E Tests
```bash
cd tests/e2e
npm run test:e2e
```

## 🚀 Deployment

### AWS Deployment
```bash
# Deploy infrastructure
cd infrastructure/aws
aws cloudformation deploy --template-file infrastructure.yml --stack-name travelbuddy

# Deploy application via Jenkins pipeline
# Push to main branch triggers automatic deployment
```

### Manual Docker Deployment
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the [documentation](docs/)
- Review the [troubleshooting guide](docs/TROUBLESHOOTING.md)

## 🎯 Roadmap

- [ ] Advanced search filters
- [ ] Real-time chat support
- [ ] Mobile app store deployment
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Third-party booking integrations

---

**Built with ❤️ for seamless travel experiences**

