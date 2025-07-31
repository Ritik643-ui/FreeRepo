# TravelBuddy Backend Dockerfile
# Multi-stage build for Spring Boot application

# Build stage
FROM maven:3.9.5-openjdk-17-slim AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies (for better caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests -B

# Runtime stage
FROM openjdk:17-jdk-slim AS runtime

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create app user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Set working directory
WORKDIR /app

# Copy the built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Create logs directory
RUN mkdir -p /var/log/travelbuddy && chown -R appuser:appuser /var/log/travelbuddy

# Change ownership of the app directory
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/api/actuator/health || exit 1

# Set JVM options
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC -XX:+UseContainerSupport"

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

# Development stage (for development with hot reload)
FROM runtime AS development

# Switch back to root to install development tools
USER root

# Install development tools
RUN apt-get update && apt-get install -y \
    git \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Copy Maven wrapper and pom.xml for development
COPY --from=build /app/pom.xml .
COPY --from=build /root/.m2 /home/appuser/.m2

# Change ownership
RUN chown -R appuser:appuser /home/appuser/.m2

# Switch back to app user
USER appuser

# Set development environment
ENV SPRING_PROFILES_ACTIVE=development
ENV SPRING_DEVTOOLS_RESTART_ENABLED=true

# For development, we'll mount the source code as a volume
# and use Maven to run the application with hot reload
CMD ["sh", "-c", "if [ -f pom.xml ]; then mvn spring-boot:run; else java $JAVA_OPTS -jar app.jar; fi"]

# Production stage
FROM runtime AS production

# Set production environment
ENV SPRING_PROFILES_ACTIVE=production

# Additional production optimizations
ENV JAVA_OPTS="-Xmx1g -Xms512m -XX:+UseG1GC -XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

