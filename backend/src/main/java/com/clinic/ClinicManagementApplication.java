package com.clinic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ClinicManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClinicManagementApplication.class, args);
    }

    @GetMapping("/")
    public String hello() {
        return "Hello World! Welcome to the Clinic Management System 🏥";
    }

    @GetMapping("/health")
    public String health() {
        return "Clinic Management System is running! ✅";
    }

    @GetMapping("/api/info")
    public ClinicInfo getClinicInfo() {
        return new ClinicInfo(
            "Pet Clinic Management System",
            "1.0.0",
            "A simple system to manage pets, owners, and consultation fees",
            "Running on AWS EC2 with CI/CD Pipeline"
        );
    }

    public static class ClinicInfo {
        private String name;
        private String version;
        private String description;
        private String deployment;

        public ClinicInfo(String name, String version, String description, String deployment) {
            this.name = name;
            this.version = version;
            this.description = description;
            this.deployment = deployment;
        }

        // Getters
        public String getName() { return name; }
        public String getVersion() { return version; }
        public String getDescription() { return description; }
        public String getDeployment() { return deployment; }

        // Setters
        public void setName(String name) { this.name = name; }
        public void setVersion(String version) { this.version = version; }
        public void setDescription(String description) { this.description = description; }
        public void setDeployment(String deployment) { this.deployment = deployment; }
    }
}
