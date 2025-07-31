package com.travelbuddy.service;

import com.travelbuddy.entity.User;
import com.travelbuddy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * UserService - Business logic for user management
 * 
 * Handles user registration, authentication, profile management,
 * and user-related business operations.
 */
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Register a new user
     */
    public User registerUser(User user) {
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists: " + user.getEmail());
        }

        // Check if username already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists: " + user.getUsername());
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Set default values
        user.setStatus(User.UserStatus.ACTIVE);
        user.setRole(User.UserRole.USER);
        user.setEmailVerified(false);
        user.setPhoneVerified(false);
        user.setFailedLoginAttempts(0);

        return userRepository.save(user);
    }

    /**
     * Find user by email or username
     */
    @Transactional(readOnly = true)
    public Optional<User> findByEmailOrUsername(String emailOrUsername) {
        return userRepository.findByEmailOrUsername(emailOrUsername);
    }

    /**
     * Find user by ID
     */
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Find user by email
     */
    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Update user profile
     */
    public User updateProfile(Long userId, User updatedUser) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Update allowed fields
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
        existingUser.setDateOfBirth(updatedUser.getDateOfBirth());
        existingUser.setProfileImageUrl(updatedUser.getProfileImageUrl());

        return userRepository.save(existingUser);
    }

    /**
     * Change user password
     */
    public void changePassword(Long userId, String currentPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Verify current password
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    /**
     * Update last login time
     */
    public void updateLastLogin(Long userId) {
        userRepository.updateLastLogin(userId, LocalDateTime.now());
    }

    /**
     * Handle failed login attempt
     */
    public void handleFailedLogin(String emailOrUsername) {
        Optional<User> userOpt = userRepository.findByEmailOrUsername(emailOrUsername);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            int failedAttempts = user.getFailedLoginAttempts() + 1;
            
            userRepository.updateFailedLoginAttempts(user.getId(), failedAttempts);
            
            // Lock account after 5 failed attempts for 30 minutes
            if (failedAttempts >= 5) {
                LocalDateTime lockUntil = LocalDateTime.now().plusMinutes(30);
                userRepository.lockUserAccount(user.getId(), lockUntil);
            }
        }
    }

    /**
     * Reset failed login attempts
     */
    public void resetFailedLoginAttempts(Long userId) {
        userRepository.updateFailedLoginAttempts(userId, 0);
    }

    /**
     * Verify email
     */
    public void verifyEmail(Long userId) {
        userRepository.updateEmailVerificationStatus(userId, true);
    }

    /**
     * Verify phone
     */
    public void verifyPhone(Long userId) {
        userRepository.updatePhoneVerificationStatus(userId, true);
    }

    /**
     * Deactivate user account
     */
    public void deactivateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        user.setStatus(User.UserStatus.INACTIVE);
        userRepository.save(user);
    }

    /**
     * Activate user account
     */
    public void activateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        user.setStatus(User.UserStatus.ACTIVE);
        userRepository.save(user);
    }

    /**
     * Get all users with pagination
     */
    @Transactional(readOnly = true)
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    /**
     * Search users by name
     */
    @Transactional(readOnly = true)
    public Page<User> searchUsersByName(String name, Pageable pageable) {
        return userRepository.findByNameContaining(name, pageable);
    }

    /**
     * Get users by status
     */
    @Transactional(readOnly = true)
    public List<User> getUsersByStatus(User.UserStatus status) {
        return userRepository.findByStatus(status);
    }

    /**
     * Get active users
     */
    @Transactional(readOnly = true)
    public List<User> getActiveUsers() {
        return userRepository.findActiveUsers();
    }

    /**
     * Get user statistics
     */
    @Transactional(readOnly = true)
    public UserStatistics getUserStatistics() {
        UserStatistics stats = new UserStatistics();
        stats.setTotalUsers(userRepository.count());
        stats.setActiveUsers(userRepository.countByStatus(User.UserStatus.ACTIVE));
        stats.setInactiveUsers(userRepository.countByStatus(User.UserStatus.INACTIVE));
        stats.setSuspendedUsers(userRepository.countByStatus(User.UserStatus.SUSPENDED));
        stats.setUsersRegisteredToday(userRepository.countUsersRegisteredToday());
        stats.setUsersRegisteredThisMonth(userRepository.countUsersRegisteredThisMonth());
        return stats;
    }

    /**
     * Check if user exists by email
     */
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Check if user exists by username
     */
    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    /**
     * Delete user (soft delete by setting status to DELETED)
     */
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        user.setStatus(User.UserStatus.DELETED);
        userRepository.save(user);
    }

    /**
     * User Statistics DTO
     */
    public static class UserStatistics {
        private Long totalUsers;
        private Long activeUsers;
        private Long inactiveUsers;
        private Long suspendedUsers;
        private Long usersRegisteredToday;
        private Long usersRegisteredThisMonth;

        // Getters and setters
        public Long getTotalUsers() { return totalUsers; }
        public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }
        
        public Long getActiveUsers() { return activeUsers; }
        public void setActiveUsers(Long activeUsers) { this.activeUsers = activeUsers; }
        
        public Long getInactiveUsers() { return inactiveUsers; }
        public void setInactiveUsers(Long inactiveUsers) { this.inactiveUsers = inactiveUsers; }
        
        public Long getSuspendedUsers() { return suspendedUsers; }
        public void setSuspendedUsers(Long suspendedUsers) { this.suspendedUsers = suspendedUsers; }
        
        public Long getUsersRegisteredToday() { return usersRegisteredToday; }
        public void setUsersRegisteredToday(Long usersRegisteredToday) { this.usersRegisteredToday = usersRegisteredToday; }
        
        public Long getUsersRegisteredThisMonth() { return usersRegisteredThisMonth; }
        public void setUsersRegisteredThisMonth(Long usersRegisteredThisMonth) { this.usersRegisteredThisMonth = usersRegisteredThisMonth; }
    }
}

