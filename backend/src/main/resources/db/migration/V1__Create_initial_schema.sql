-- TravelBuddy Database Schema - Initial Migration
-- Version: V1
-- Description: Create initial database schema for TravelBuddy application

-- Enable UUID extension for PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15),
    date_of_birth DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
    profile_image_url VARCHAR(500),
    last_login TIMESTAMP,
    failed_login_attempts INTEGER NOT NULL DEFAULT 0,
    account_locked_until TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_user_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED')),
    CONSTRAINT chk_user_role CHECK (role IN ('USER', 'ADMIN', 'MODERATOR')),
    CONSTRAINT chk_failed_attempts CHECK (failed_login_attempts >= 0)
);

-- Create indexes for users table
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_username ON users(username);
CREATE INDEX idx_user_status ON users(status);
CREATE INDEX idx_user_role ON users(role);
CREATE INDEX idx_user_created_at ON users(created_at);

-- Create bookings table
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL,
    transport_type VARCHAR(20) NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    travel_date TIMESTAMP NOT NULL,
    return_date TIMESTAMP,
    passenger_count INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0.00,
    final_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    payment_transaction_id VARCHAR(100),
    confirmation_number VARCHAR(50),
    cancellation_reason VARCHAR(500),
    special_requests TEXT,
    booking_expires_at TIMESTAMP,
    check_in_date TIMESTAMP,
    check_out_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_booking_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_transport_type CHECK (transport_type IN ('FLIGHT', 'TRAIN', 'BUS', 'HOTEL', 'CAR_RENTAL')),
    CONSTRAINT chk_booking_status CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'EXPIRED', 'REFUNDED')),
    CONSTRAINT chk_payment_status CHECK (payment_status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED')),
    CONSTRAINT chk_passenger_count CHECK (passenger_count > 0),
    CONSTRAINT chk_total_amount CHECK (total_amount >= 0),
    CONSTRAINT chk_final_amount CHECK (final_amount >= 0),
    CONSTRAINT chk_discount CHECK (discount >= 0)
);

-- Create indexes for bookings table
CREATE INDEX idx_booking_user ON bookings(user_id);
CREATE INDEX idx_booking_status ON bookings(status);
CREATE INDEX idx_booking_reference ON bookings(booking_reference);
CREATE INDEX idx_booking_travel_date ON bookings(travel_date);
CREATE INDEX idx_booking_transport_type ON bookings(transport_type);
CREATE INDEX idx_booking_payment_status ON bookings(payment_status);
CREATE INDEX idx_booking_created_at ON bookings(created_at);
CREATE INDEX idx_booking_origin_destination ON bookings(origin, destination);

-- Create passengers table
CREATE TABLE passengers (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(10) NOT NULL,
    passenger_type VARCHAR(20) NOT NULL DEFAULT 'ADULT',
    nationality VARCHAR(50),
    passport_number VARCHAR(20),
    passport_expiry DATE,
    passport_country VARCHAR(50),
    id_number VARCHAR(50),
    id_type VARCHAR(20),
    phone_number VARCHAR(15),
    email VARCHAR(100),
    seat_preference VARCHAR(20),
    meal_preference VARCHAR(50),
    special_assistance TEXT,
    frequent_flyer_number VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_passenger_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    CONSTRAINT chk_gender CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
    CONSTRAINT chk_passenger_type CHECK (passenger_type IN ('ADULT', 'CHILD', 'INFANT', 'SENIOR'))
);

-- Create indexes for passengers table
CREATE INDEX idx_passenger_booking ON passengers(booking_id);
CREATE INDEX idx_passenger_type ON passengers(passenger_type);
CREATE INDEX idx_passenger_name ON passengers(first_name, last_name);

-- Create user_preferences table
CREATE TABLE user_preferences (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    preference_key VARCHAR(100) NOT NULL,
    preference_value VARCHAR(500),
    preference_type VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user_preference_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_preference UNIQUE (user_id, preference_key)
);

-- Create indexes for user_preferences table
CREATE INDEX idx_user_preference_user ON user_preferences(user_id);
CREATE INDEX idx_user_preference_key ON user_preferences(preference_key);

-- Create booking_history table
CREATE TABLE booking_history (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    previous_status VARCHAR(50),
    notes VARCHAR(500),
    changed_by VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_booking_history_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Create indexes for booking_history table
CREATE INDEX idx_booking_history_booking ON booking_history(booking_id);
CREATE INDEX idx_booking_history_status ON booking_history(status);
CREATE INDEX idx_booking_history_created ON booking_history(created_at);

-- Create routes table (for popular routes and pricing)
CREATE TABLE routes (
    id BIGSERIAL PRIMARY KEY,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    transport_type VARCHAR(20) NOT NULL,
    distance_km INTEGER,
    estimated_duration_minutes INTEGER,
    base_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_route_transport_type CHECK (transport_type IN ('FLIGHT', 'TRAIN', 'BUS', 'HOTEL', 'CAR_RENTAL')),
    CONSTRAINT chk_route_distance CHECK (distance_km >= 0),
    CONSTRAINT chk_route_duration CHECK (estimated_duration_minutes >= 0),
    CONSTRAINT chk_route_price CHECK (base_price >= 0),
    CONSTRAINT uk_route UNIQUE (origin, destination, transport_type)
);

-- Create indexes for routes table
CREATE INDEX idx_route_origin_destination ON routes(origin, destination);
CREATE INDEX idx_route_transport_type ON routes(transport_type);
CREATE INDEX idx_route_active ON routes(is_active);

-- Create notifications table
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    booking_id BIGINT,
    action_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP,
    
    CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_notification_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
    CONSTRAINT chk_notification_type CHECK (type IN ('BOOKING_CONFIRMATION', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'BOOKING_REMINDER', 'CANCELLATION', 'GENERAL'))
);

-- Create indexes for notifications table
CREATE INDEX idx_notification_user ON notifications(user_id);
CREATE INDEX idx_notification_type ON notifications(type);
CREATE INDEX idx_notification_read ON notifications(is_read);
CREATE INDEX idx_notification_created ON notifications(created_at);

-- Create payment_transactions table
CREATE TABLE payment_transactions (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status VARCHAR(20) NOT NULL,
    gateway_response TEXT,
    gateway_transaction_id VARCHAR(100),
    processed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_payment_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    CONSTRAINT chk_payment_status CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED')),
    CONSTRAINT chk_payment_amount CHECK (amount >= 0)
);

-- Create indexes for payment_transactions table
CREATE INDEX idx_payment_booking ON payment_transactions(booking_id);
CREATE INDEX idx_payment_transaction_id ON payment_transactions(transaction_id);
CREATE INDEX idx_payment_status ON payment_transactions(status);
CREATE INDEX idx_payment_created ON payment_transactions(created_at);

-- Create audit_logs table
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id BIGINT NOT NULL,
    action VARCHAR(20) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    changed_by VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_audit_action CHECK (action IN ('INSERT', 'UPDATE', 'DELETE'))
);

-- Create indexes for audit_logs table
CREATE INDEX idx_audit_table_record ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created ON audit_logs(created_at);
CREATE INDEX idx_audit_changed_by ON audit_logs(changed_by);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_passengers_updated_at BEFORE UPDATE ON passengers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routes_updated_at BEFORE UPDATE ON routes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON payment_transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password, first_name, last_name, role, email_verified) VALUES
('admin', 'admin@travelbuddy.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'ADMIN', true);

-- Insert sample routes
INSERT INTO routes (origin, destination, transport_type, distance_km, estimated_duration_minutes, base_price) VALUES
('New York', 'Los Angeles', 'FLIGHT', 3944, 360, 299.99),
('New York', 'Boston', 'TRAIN', 306, 240, 89.99),
('New York', 'Philadelphia', 'BUS', 153, 120, 29.99),
('London', 'Paris', 'FLIGHT', 344, 75, 149.99),
('London', 'Edinburgh', 'TRAIN', 666, 270, 79.99),
('Tokyo', 'Osaka', 'TRAIN', 515, 165, 120.00),
('Mumbai', 'Delhi', 'FLIGHT', 1138, 120, 89.99),
('Sydney', 'Melbourne', 'FLIGHT', 713, 90, 159.99);

-- Insert sample user preferences
INSERT INTO user_preferences (user_id, preference_key, preference_value, preference_type) VALUES
(1, 'preferred_currency', 'USD', 'CURRENCY'),
(1, 'notification_email', 'true', 'BOOLEAN'),
(1, 'notification_sms', 'false', 'BOOLEAN'),
(1, 'preferred_language', 'en', 'LANGUAGE');

-- Create views for reporting

-- View for booking statistics
CREATE VIEW booking_stats AS
SELECT 
    transport_type,
    status,
    COUNT(*) as booking_count,
    SUM(final_amount) as total_revenue,
    AVG(final_amount) as avg_booking_value
FROM bookings 
GROUP BY transport_type, status;

-- View for user statistics
CREATE VIEW user_stats AS
SELECT 
    status,
    role,
    COUNT(*) as user_count,
    COUNT(CASE WHEN email_verified = true THEN 1 END) as verified_users,
    COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as new_users_30_days
FROM users 
GROUP BY status, role;

-- View for popular routes
CREATE VIEW popular_routes AS
SELECT 
    b.origin,
    b.destination,
    b.transport_type,
    COUNT(*) as booking_count,
    AVG(b.final_amount) as avg_price,
    SUM(b.final_amount) as total_revenue
FROM bookings b
WHERE b.status IN ('CONFIRMED', 'COMPLETED')
GROUP BY b.origin, b.destination, b.transport_type
ORDER BY booking_count DESC;

-- Grant permissions (adjust as needed for your environment)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO travelbuddy_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO travelbuddy_user;
-- GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO travelbuddy_user;

