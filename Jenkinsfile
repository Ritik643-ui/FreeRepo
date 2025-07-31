pipeline {
    agent any
    
    environment {
        // Docker and Registry Configuration
        DOCKER_REGISTRY = credentials('docker-registry-url')
        DOCKER_CREDENTIALS = credentials('docker-registry-credentials')
        
        // AWS Configuration
        AWS_REGION = 'us-east-1'
        AWS_CREDENTIALS = credentials('aws-credentials')
        ECS_CLUSTER = 'travelbuddy-cluster'
        ECS_SERVICE_BACKEND = 'travelbuddy-backend-service'
        ECS_SERVICE_FRONTEND = 'travelbuddy-frontend-service'
        
        // Application Configuration
        APP_NAME = 'travelbuddy'
        BACKEND_IMAGE = "${DOCKER_REGISTRY}/${APP_NAME}-backend"
        FRONTEND_IMAGE = "${DOCKER_REGISTRY}/${APP_NAME}-frontend"
        
        // Database Configuration
        DATABASE_URL = credentials('database-url')
        DATABASE_CREDENTIALS = credentials('database-credentials')
        
        // Security Configuration
        JWT_SECRET = credentials('jwt-secret')
        
        // Notification Configuration
        SLACK_WEBHOOK = credentials('slack-webhook')
        
        // Version Configuration
        BUILD_VERSION = "${env.BUILD_NUMBER}"
        GIT_COMMIT_SHORT = "${env.GIT_COMMIT[0..7]}"
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
        skipDefaultCheckout()
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    // Clean workspace and checkout code
                    cleanWs()
                    checkout scm
                    
                    // Set build display name
                    currentBuild.displayName = "#${BUILD_NUMBER} - ${GIT_COMMIT_SHORT}"
                    
                    // Get commit message for notifications
                    env.GIT_COMMIT_MESSAGE = sh(
                        script: 'git log -1 --pretty=%B',
                        returnStdout: true
                    ).trim()
                }
            }
        }
        
        stage('Environment Setup') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir('backend') {
                            sh '''
                                echo "Setting up backend environment..."
                                mvn --version
                                java -version
                                mvn dependency:resolve
                            '''
                        }
                    }
                }
                
                stage('Frontend Dependencies') {
                    steps {
                        dir('frontend') {
                            sh '''
                                echo "Setting up frontend environment..."
                                node --version
                                npm --version
                                npm ci
                            '''
                        }
                    }
                }
            }
        }
        
        stage('Code Quality & Security') {
            parallel {
                stage('Backend Code Quality') {
                    steps {
                        dir('backend') {
                            sh '''
                                echo "Running backend code quality checks..."
                                mvn compile
                                mvn spotbugs:check
                                mvn pmd:check
                            '''
                        }
                    }
                    post {
                        always {
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'backend/target/site',
                                reportFiles: 'spotbugs.html,pmd.html',
                                reportName: 'Backend Code Quality Report'
                            ])
                        }
                    }
                }
                
                stage('Frontend Code Quality') {
                    steps {
                        dir('frontend') {
                            sh '''
                                echo "Running frontend code quality checks..."
                                npm run lint
                                npm run type-check
                            '''
                        }
                    }
                }
                
                stage('Security Scan') {
                    steps {
                        sh '''
                            echo "Running security scans..."
                            # OWASP Dependency Check
                            mvn -f backend/pom.xml org.owasp:dependency-check-maven:check
                            
                            # NPM Audit
                            cd frontend && npm audit --audit-level moderate
                        '''
                    }
                    post {
                        always {
                            publishHTML([
                                allowMissing: true,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'backend/target',
                                reportFiles: 'dependency-check-report.html',
                                reportName: 'Security Scan Report'
                            ])
                        }
                    }
                }
            }
        }
        
        stage('Testing') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            sh '''
                                echo "Running backend tests..."
                                mvn test
                                mvn jacoco:report
                            '''
                        }
                    }
                    post {
                        always {
                            junit 'backend/target/surefire-reports/*.xml'
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'backend/target/site/jacoco',
                                reportFiles: 'index.html',
                                reportName: 'Backend Coverage Report'
                            ])
                        }
                    }
                }
                
                stage('Frontend Tests') {
                    steps {
                        dir('frontend') {
                            sh '''
                                echo "Running frontend tests..."
                                npm run test:coverage
                            '''
                        }
                    }
                    post {
                        always {
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'frontend/coverage/lcov-report',
                                reportFiles: 'index.html',
                                reportName: 'Frontend Coverage Report'
                            ])
                        }
                    }
                }
                
                stage('Integration Tests') {
                    steps {
                        sh '''
                            echo "Running integration tests..."
                            docker-compose -f docker-compose.yml up -d postgres redis
                            sleep 30
                            
                            cd backend
                            mvn failsafe:integration-test failsafe:verify
                            
                            docker-compose -f docker-compose.yml down
                        '''
                    }
                    post {
                        always {
                            junit 'backend/target/failsafe-reports/*.xml'
                        }
                    }
                }
            }
        }
        
        stage('Build Applications') {
            parallel {
                stage('Build Backend') {
                    steps {
                        dir('backend') {
                            sh '''
                                echo "Building backend application..."
                                mvn clean package -DskipTests
                                
                                echo "Building backend Docker image..."
                                docker build -t ${BACKEND_IMAGE}:${BUILD_VERSION} .
                                docker tag ${BACKEND_IMAGE}:${BUILD_VERSION} ${BACKEND_IMAGE}:latest
                            '''
                        }
                    }
                }
                
                stage('Build Frontend') {
                    steps {
                        dir('frontend') {
                            sh '''
                                echo "Building frontend application..."
                                npm run build:web
                                
                                echo "Building frontend Docker image..."
                                docker build -t ${FRONTEND_IMAGE}:${BUILD_VERSION} .
                                docker tag ${FRONTEND_IMAGE}:${BUILD_VERSION} ${FRONTEND_IMAGE}:latest
                            '''
                        }
                    }
                }
            }
        }
        
        stage('Push Images') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    branch 'release/*'
                }
            }
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", "${DOCKER_CREDENTIALS}") {
                        sh '''
                            echo "Pushing Docker images..."
                            docker push ${BACKEND_IMAGE}:${BUILD_VERSION}
                            docker push ${BACKEND_IMAGE}:latest
                            docker push ${FRONTEND_IMAGE}:${BUILD_VERSION}
                            docker push ${FRONTEND_IMAGE}:latest
                        '''
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    sh '''
                        echo "Deploying to staging environment..."
                        
                        # Update ECS service with new image
                        aws ecs update-service \
                            --cluster ${ECS_CLUSTER}-staging \
                            --service ${ECS_SERVICE_BACKEND}-staging \
                            --force-new-deployment \
                            --region ${AWS_REGION}
                            
                        aws ecs update-service \
                            --cluster ${ECS_CLUSTER}-staging \
                            --service ${ECS_SERVICE_FRONTEND}-staging \
                            --force-new-deployment \
                            --region ${AWS_REGION}
                        
                        # Wait for deployment to complete
                        aws ecs wait services-stable \
                            --cluster ${ECS_CLUSTER}-staging \
                            --services ${ECS_SERVICE_BACKEND}-staging ${ECS_SERVICE_FRONTEND}-staging \
                            --region ${AWS_REGION}
                    '''
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Manual approval for production deployment
                    timeout(time: 10, unit: 'MINUTES') {
                        input message: 'Deploy to production?', 
                              ok: 'Deploy',
                              submitterParameter: 'APPROVER'
                    }
                    
                    sh '''
                        echo "Deploying to production environment..."
                        echo "Approved by: ${APPROVER}"
                        
                        # Create deployment backup
                        aws ecs describe-services \
                            --cluster ${ECS_CLUSTER} \
                            --services ${ECS_SERVICE_BACKEND} ${ECS_SERVICE_FRONTEND} \
                            --region ${AWS_REGION} > deployment-backup-${BUILD_VERSION}.json
                        
                        # Update ECS services
                        aws ecs update-service \
                            --cluster ${ECS_CLUSTER} \
                            --service ${ECS_SERVICE_BACKEND} \
                            --force-new-deployment \
                            --region ${AWS_REGION}
                            
                        aws ecs update-service \
                            --cluster ${ECS_CLUSTER} \
                            --service ${ECS_SERVICE_FRONTEND} \
                            --force-new-deployment \
                            --region ${AWS_REGION}
                        
                        # Wait for deployment to complete
                        aws ecs wait services-stable \
                            --cluster ${ECS_CLUSTER} \
                            --services ${ECS_SERVICE_BACKEND} ${ECS_SERVICE_FRONTEND} \
                            --region ${AWS_REGION}
                    '''
                }
            }
        }
        
        stage('Post-Deployment Tests') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            parallel {
                stage('Health Checks') {
                    steps {
                        script {
                            def environment = env.BRANCH_NAME == 'main' ? 'prod' : 'staging'
                            def backendUrl = env.BRANCH_NAME == 'main' ? 
                                'https://api.travelbuddy.com' : 'https://api-staging.travelbuddy.com'
                            def frontendUrl = env.BRANCH_NAME == 'main' ? 
                                'https://travelbuddy.com' : 'https://staging.travelbuddy.com'
                            
                            sh """
                                echo "Running health checks for ${environment}..."
                                
                                # Backend health check
                                curl -f ${backendUrl}/api/actuator/health || exit 1
                                
                                # Frontend health check
                                curl -f ${frontendUrl} || exit 1
                                
                                echo "Health checks passed!"
                            """
                        }
                    }
                }
                
                stage('Smoke Tests') {
                    steps {
                        sh '''
                            echo "Running smoke tests..."
                            cd tests/api
                            npm install
                            npm run test:smoke
                        '''
                    }
                    post {
                        always {
                            publishHTML([
                                allowMissing: true,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'tests/api/reports',
                                reportFiles: 'smoke-test-report.html',
                                reportName: 'Smoke Test Report'
                            ])
                        }
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Clean up Docker images
            sh '''
                docker image prune -f
                docker system prune -f --volumes
            '''
            
            // Archive artifacts
            archiveArtifacts artifacts: 'backend/target/*.jar,frontend/build/**/*', 
                           fingerprint: true, 
                           allowEmptyArchive: true
        }
        
        success {
            script {
                def environment = env.BRANCH_NAME == 'main' ? 'Production' : 
                                env.BRANCH_NAME == 'develop' ? 'Staging' : 'Development'
                
                // Send success notification
                sh """
                    curl -X POST -H 'Content-type: application/json' \
                    --data '{"text":"✅ TravelBuddy deployment to ${environment} successful!\\nBuild: #${BUILD_NUMBER}\\nCommit: ${GIT_COMMIT_SHORT}\\nBranch: ${BRANCH_NAME}"}' \
                    ${SLACK_WEBHOOK}
                """
            }
        }
        
        failure {
            script {
                def environment = env.BRANCH_NAME == 'main' ? 'Production' : 
                                env.BRANCH_NAME == 'develop' ? 'Staging' : 'Development'
                
                // Send failure notification
                sh """
                    curl -X POST -H 'Content-type: application/json' \
                    --data '{"text":"❌ TravelBuddy deployment to ${environment} failed!\\nBuild: #${BUILD_NUMBER}\\nCommit: ${GIT_COMMIT_SHORT}\\nBranch: ${BRANCH_NAME}\\nCheck: ${BUILD_URL}"}' \
                    ${SLACK_WEBHOOK}
                """
            }
        }
        
        unstable {
            script {
                // Send unstable notification
                sh """
                    curl -X POST -H 'Content-type: application/json' \
                    --data '{"text":"⚠️ TravelBuddy build unstable!\\nBuild: #${BUILD_NUMBER}\\nCommit: ${GIT_COMMIT_SHORT}\\nBranch: ${BRANCH_NAME}\\nCheck: ${BUILD_URL}"}' \
                    ${SLACK_WEBHOOK}
                """
            }
        }
    }
}

