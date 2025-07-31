package com.travelbuddy.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * UserPreference Entity - Stores user preferences and settings
 */
@Entity
@Table(name = "user_preferences", indexes = {
    @Index(name = "idx_user_preference_user", columnList = "user_id"),
    @Index(name = "idx_user_preference_key", columnList = "preference_key")
})
@EntityListeners(AuditingEntityListener.class)
public class UserPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "preference_key", nullable = false, length = 100)
    private String preferenceKey;

    @Column(name = "preference_value", length = 500)
    private String preferenceValue;

    @Column(name = "preference_type", length = 50)
    private String preferenceType;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors, getters, setters
    public UserPreference() {}

    public UserPreference(User user, String preferenceKey, String preferenceValue) {
        this.user = user;
        this.preferenceKey = preferenceKey;
        this.preferenceValue = preferenceValue;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public String getPreferenceKey() { return preferenceKey; }
    public void setPreferenceKey(String preferenceKey) { this.preferenceKey = preferenceKey; }
    
    public String getPreferenceValue() { return preferenceValue; }
    public void setPreferenceValue(String preferenceValue) { this.preferenceValue = preferenceValue; }
    
    public String getPreferenceType() { return preferenceType; }
    public void setPreferenceType(String preferenceType) { this.preferenceType = preferenceType; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

