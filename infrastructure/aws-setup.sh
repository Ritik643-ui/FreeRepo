#!/bin/bash

# AWS EC2 Setup Script for Clinic Management System
# This script sets up the infrastructure needed to host the clinic management system on AWS EC2

set -e

# Configuration
REGION="us-east-1"
INSTANCE_TYPE="t3.medium"
KEY_NAME="clinic-management-key"
SECURITY_GROUP_NAME="clinic-management-sg"
AMI_ID="ami-0c02fb55956c7d316"  # Amazon Linux 2023 AMI
INSTANCE_NAME="clinic-management-server"

echo "🏥 Setting up AWS infrastructure for Clinic Management System..."

# Check if AWS CLI is installed and configured
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ AWS CLI is configured"

# Create key pair if it doesn't exist
if ! aws ec2 describe-key-pairs --key-names "$KEY_NAME" --region "$REGION" &> /dev/null; then
    echo "🔑 Creating key pair: $KEY_NAME"
    aws ec2 create-key-pair \
        --key-name "$KEY_NAME" \
        --region "$REGION" \
        --query 'KeyMaterial' \
        --output text > "${KEY_NAME}.pem"
    
    chmod 400 "${KEY_NAME}.pem"
    echo "✅ Key pair created and saved as ${KEY_NAME}.pem"
else
    echo "✅ Key pair $KEY_NAME already exists"
fi

# Create security group if it doesn't exist
SECURITY_GROUP_ID=$(aws ec2 describe-security-groups \
    --group-names "$SECURITY_GROUP_NAME" \
    --region "$REGION" \
    --query 'SecurityGroups[0].GroupId' \
    --output text 2>/dev/null || echo "None")

if [ "$SECURITY_GROUP_ID" = "None" ]; then
    echo "🔒 Creating security group: $SECURITY_GROUP_NAME"
    SECURITY_GROUP_ID=$(aws ec2 create-security-group \
        --group-name "$SECURITY_GROUP_NAME" \
        --description "Security group for Clinic Management System" \
        --region "$REGION" \
        --query 'GroupId' \
        --output text)
    
    # Add inbound rules
    echo "📝 Adding security group rules..."
    
    # SSH access
    aws ec2 authorize-security-group-ingress \
        --group-id "$SECURITY_GROUP_ID" \
        --protocol tcp \
        --port 22 \
        --cidr 0.0.0.0/0 \
        --region "$REGION"
    
    # HTTP access
    aws ec2 authorize-security-group-ingress \
        --group-id "$SECURITY_GROUP_ID" \
        --protocol tcp \
        --port 80 \
        --cidr 0.0.0.0/0 \
        --region "$REGION"
    
    # HTTPS access
    aws ec2 authorize-security-group-ingress \
        --group-id "$SECURITY_GROUP_ID" \
        --protocol tcp \
        --port 443 \
        --cidr 0.0.0.0/0 \
        --region "$REGION"
    
    # Application port
    aws ec2 authorize-security-group-ingress \
        --group-id "$SECURITY_GROUP_ID" \
        --protocol tcp \
        --port 8080 \
        --cidr 0.0.0.0/0 \
        --region "$REGION"
    
    echo "✅ Security group created with ID: $SECURITY_GROUP_ID"
else
    echo "✅ Security group $SECURITY_GROUP_NAME already exists with ID: $SECURITY_GROUP_ID"
fi

# Create user data script for EC2 instance
cat > user-data.sh << 'EOF'
#!/bin/bash
yum update -y

# Install Docker
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Java 17
yum install -y java-17-amazon-corretto

# Install Git
yum install -y git

# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install

# Create application directory
mkdir -p /opt/clinic-management
chown ec2-user:ec2-user /opt/clinic-management

# Create systemd service for the application
cat > /etc/systemd/system/clinic-management.service << 'SERVICE_EOF'
[Unit]
Description=Clinic Management System
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/clinic-management
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
User=ec2-user

[Install]
WantedBy=multi-user.target
SERVICE_EOF

systemctl daemon-reload
systemctl enable clinic-management

# Create log directory
mkdir -p /var/log/clinic-management
chown ec2-user:ec2-user /var/log/clinic-management

echo "✅ EC2 instance setup completed!" > /var/log/clinic-management/setup.log
EOF

# Launch EC2 instance
echo "🚀 Launching EC2 instance..."
INSTANCE_ID=$(aws ec2 run-instances \
    --image-id "$AMI_ID" \
    --count 1 \
    --instance-type "$INSTANCE_TYPE" \
    --key-name "$KEY_NAME" \
    --security-group-ids "$SECURITY_GROUP_ID" \
    --user-data file://user-data.sh \
    --region "$REGION" \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$INSTANCE_NAME},{Key=Project,Value=ClinicManagement}]" \
    --query 'Instances[0].InstanceId' \
    --output text)

echo "✅ EC2 instance launched with ID: $INSTANCE_ID"

# Wait for instance to be running
echo "⏳ Waiting for instance to be running..."
aws ec2 wait instance-running --instance-ids "$INSTANCE_ID" --region "$REGION"

# Get public IP
PUBLIC_IP=$(aws ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --region "$REGION" \
    --query 'Reservations[0].Instances[0].PublicIpAddress' \
    --output text)

echo "✅ Instance is running!"
echo "📍 Public IP: $PUBLIC_IP"

# Create deployment script
cat > deploy-to-ec2.sh << 'DEPLOY_EOF'
#!/bin/bash

# Deployment script for Clinic Management System
set -e

INSTANCE_IP="$1"
KEY_FILE="$2"

if [ -z "$INSTANCE_IP" ] || [ -z "$KEY_FILE" ]; then
    echo "Usage: $0 <instance-ip> <key-file>"
    exit 1
fi

echo "🚀 Deploying Clinic Management System to $INSTANCE_IP..."

# Copy application files
scp -i "$KEY_FILE" -o StrictHostKeyChecking=no -r . ec2-user@"$INSTANCE_IP":/opt/clinic-management/

# Connect and start services
ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no ec2-user@"$INSTANCE_IP" << 'SSH_EOF'
cd /opt/clinic-management

# Build and start the application
docker-compose -f docker-compose.clinic.yml up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 60

# Check if application is running
if curl -f http://localhost:8080/api/health; then
    echo "✅ Clinic Management System is running successfully!"
else
    echo "❌ Application failed to start. Check logs:"
    docker-compose -f docker-compose.clinic.yml logs
    exit 1
fi
SSH_EOF

echo "✅ Deployment completed successfully!"
echo "🌐 Application URL: http://$INSTANCE_IP:8080"
echo "📊 Health Check: http://$INSTANCE_IP:8080/api/health"
echo "📚 API Documentation: http://$INSTANCE_IP:8080/api/swagger-ui.html"
DEPLOY_EOF

chmod +x deploy-to-ec2.sh

# Clean up temporary files
rm -f user-data.sh

echo ""
echo "🎉 AWS Infrastructure Setup Complete!"
echo "================================================"
echo "Instance ID: $INSTANCE_ID"
echo "Public IP: $PUBLIC_IP"
echo "Key File: ${KEY_NAME}.pem"
echo "Security Group: $SECURITY_GROUP_NAME ($SECURITY_GROUP_ID)"
echo ""
echo "📝 Next Steps:"
echo "1. Wait for the instance to finish initialization (5-10 minutes)"
echo "2. Deploy your application using:"
echo "   ./deploy-to-ec2.sh $PUBLIC_IP ${KEY_NAME}.pem"
echo ""
echo "🔗 Access URLs (after deployment):"
echo "   Application: http://$PUBLIC_IP:8080"
echo "   Health Check: http://$PUBLIC_IP:8080/api/health"
echo "   API Docs: http://$PUBLIC_IP:8080/api/swagger-ui.html"
echo ""
echo "🔑 SSH Access:"
echo "   ssh -i ${KEY_NAME}.pem ec2-user@$PUBLIC_IP"
echo ""
echo "⚠️  Remember to:"
echo "   - Keep your ${KEY_NAME}.pem file secure"
echo "   - Configure your domain/DNS if needed"
echo "   - Set up SSL certificates for production"
echo "   - Configure monitoring and backups"
