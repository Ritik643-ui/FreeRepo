package com.travelbuddy.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * BookingHistory Entity - Tracks booking status changes and history
 */
@Entity
@Table(name = "booking_history", indexes = {
    @Index(name = "idx_booking_history_booking", columnList = "booking_id"),
    @Index(name = "idx_booking_history_status", columnList = "status"),
    @Index(name = "idx_booking_history_created", columnList = "created_at")
})
@EntityListeners(AuditingEntityListener.class)
public class BookingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Column(nullable = false, length = 50)
    private String status;

    @Column(name = "previous_status", length = 50)
    private String previousStatus;

    @Column(length = 500)
    private String notes;

    @Column(name = "changed_by", length = 100)
    private String changedBy;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Constructors, getters, setters
    public BookingHistory() {}

    public BookingHistory(Booking booking, String status, String previousStatus, String notes, String changedBy) {
        this.booking = booking;
        this.status = status;
        this.previousStatus = previousStatus;
        this.notes = notes;
        this.changedBy = changedBy;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getPreviousStatus() { return previousStatus; }
    public void setPreviousStatus(String previousStatus) { this.previousStatus = previousStatus; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public String getChangedBy() { return changedBy; }
    public void setChangedBy(String changedBy) { this.changedBy = changedBy; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

