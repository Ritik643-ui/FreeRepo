package com.travelbuddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * TravelBuddy Application - Main Spring Boot Application Class
 * 
 * A comprehensive travel booking platform that provides:
 * - Multi-transport booking (flights, trains, buses, hotels)
 * - User authentication and profile management
 * - Real-time booking search and confirmation
 * - Secure payment processing integration
 * - RESTful APIs with comprehensive documentation
 * 
 * @author TravelBuddy Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EnableTransactionManagement
public class TravelBuddyApplication {

    public static void main(String[] args) {
        SpringApplication.run(TravelBuddyApplication.class, args);
    }
}

