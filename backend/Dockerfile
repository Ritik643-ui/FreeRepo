# Clinic Management Backend Dockerfile
# Multi-stage build for Spring Boot application

# Build stage
FROM eclipse-temurin:17-jdk-alpine AS build

# Install Maven
RUN apk add --no-cache maven

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
FROM eclipse-temurin:17-jre-alpine AS runtime

# Install curl for health checks
RUN apk add --no-cache curl

# Create app user
RUN addgroup -g 1001 -S appuser && adduser -u 1001 -S appuser -G appuser

# Set working directory
WORKDIR /app

# Copy the built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Create logs directory
RUN mkdir -p /var/log/clinic && chown -R appuser:appuser /var/log/clinic

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
RUN apk add --no-cache git vim

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
