package com.travelbuddy.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Booking Entity - Represents a travel booking in the system
 * 
 * This entity stores booking information including transport details,
 * passenger information, payment status, and booking lifecycle.
 */
@Entity
@Table(name = "bookings", indexes = {
    @Index(name = "idx_booking_user", columnList = "user_id"),
    @Index(name = "idx_booking_status", columnList = "status"),
    @Index(name = "idx_booking_reference", columnList = "booking_reference"),
    @Index(name = "idx_booking_travel_date", columnList = "travel_date"),
    @Index(name = "idx_booking_transport_type", columnList = "transport_type")
})
@EntityListeners(AuditingEntityListener.class)
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booking_reference", unique = true, nullable = false, length = 20)
    private String bookingReference;

    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Transport type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "transport_type", nullable = false)
    private TransportType transportType;

    @NotNull(message = "Origin is required")
    @Column(nullable = false, length = 100)
    private String origin;

    @NotNull(message = "Destination is required")
    @Column(nullable = false, length = 100)
    private String destination;

    @NotNull(message = "Travel date is required")
    @Column(name = "travel_date", nullable = false)
    private LocalDateTime travelDate;

    @Column(name = "return_date")
    private LocalDateTime returnDate;

    @NotNull(message = "Number of passengers is required")
    @Positive(message = "Number of passengers must be positive")
    @Column(name = "passenger_count", nullable = false)
    private Integer passengerCount;

    @NotNull(message = "Total amount is required")
    @Positive(message = "Total amount must be positive")
    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(precision = 10, scale = 2)
    private BigDecimal discount = BigDecimal.ZERO;

    @Column(name = "final_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal finalAmount;

    @NotNull(message = "Currency is required")
    @Column(nullable = false, length = 3)
    private String currency = "USD";

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(name = "payment_method", length = 50)
    private String paymentMethod;

    @Column(name = "payment_transaction_id", length = 100)
    private String paymentTransactionId;

    @Column(name = "confirmation_number", length = 50)
    private String confirmationNumber;

    @Column(name = "cancellation_reason", length = 500)
    private String cancellationReason;

    @Column(name = "special_requests", length = 1000)
    private String specialRequests;

    @Column(name = "booking_expires_at")
    private LocalDateTime bookingExpiresAt;

    @Column(name = "check_in_date")
    private LocalDateTime checkInDate;

    @Column(name = "check_out_date")
    private LocalDateTime checkOutDate;

    // Audit fields
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Relationships
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Passenger> passengers = new HashSet<>();

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<BookingHistory> bookingHistory = new HashSet<>();

    // Constructors
    public Booking() {}

    public Booking(User user, TransportType transportType, String origin, String destination, 
                   LocalDateTime travelDate, Integer passengerCount, BigDecimal totalAmount) {
        this.user = user;
        this.transportType = transportType;
        this.origin = origin;
        this.destination = destination;
        this.travelDate = travelDate;
        this.passengerCount = passengerCount;
        this.totalAmount = totalAmount;
        this.finalAmount = totalAmount;
        this.bookingReference = generateBookingReference();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBookingReference() {
        return bookingReference;
    }

    public void setBookingReference(String bookingReference) {
        this.bookingReference = bookingReference;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TransportType getTransportType() {
        return transportType;
    }

    public void setTransportType(TransportType transportType) {
        this.transportType = transportType;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDateTime getTravelDate() {
        return travelDate;
    }

    public void setTravelDate(LocalDateTime travelDate) {
        this.travelDate = travelDate;
    }

    public LocalDateTime getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDateTime returnDate) {
        this.returnDate = returnDate;
    }

    public Integer getPassengerCount() {
        return passengerCount;
    }

    public void setPassengerCount(Integer passengerCount) {
        this.passengerCount = passengerCount;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getFinalAmount() {
        return finalAmount;
    }

    public void setFinalAmount(BigDecimal finalAmount) {
        this.finalAmount = finalAmount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentTransactionId() {
        return paymentTransactionId;
    }

    public void setPaymentTransactionId(String paymentTransactionId) {
        this.paymentTransactionId = paymentTransactionId;
    }

    public String getConfirmationNumber() {
        return confirmationNumber;
    }

    public void setConfirmationNumber(String confirmationNumber) {
        this.confirmationNumber = confirmationNumber;
    }

    public String getCancellationReason() {
        return cancellationReason;
    }

    public void setCancellationReason(String cancellationReason) {
        this.cancellationReason = cancellationReason;
    }

    public String getSpecialRequests() {
        return specialRequests;
    }

    public void setSpecialRequests(String specialRequests) {
        this.specialRequests = specialRequests;
    }

    public LocalDateTime getBookingExpiresAt() {
        return bookingExpiresAt;
    }

    public void setBookingExpiresAt(LocalDateTime bookingExpiresAt) {
        this.bookingExpiresAt = bookingExpiresAt;
    }

    public LocalDateTime getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDateTime checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDateTime getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDateTime checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(Set<Passenger> passengers) {
        this.passengers = passengers;
    }

    public Set<BookingHistory> getBookingHistory() {
        return bookingHistory;
    }

    public void setBookingHistory(Set<BookingHistory> bookingHistory) {
        this.bookingHistory = bookingHistory;
    }

    // Utility methods
    private String generateBookingReference() {
        return "TB" + System.currentTimeMillis() + (int)(Math.random() * 1000);
    }

    public boolean isExpired() {
        return bookingExpiresAt != null && bookingExpiresAt.isBefore(LocalDateTime.now());
    }

    public boolean canBeCancelled() {
        return status == BookingStatus.CONFIRMED && 
               travelDate.isAfter(LocalDateTime.now().plusHours(24));
    }

    public boolean isRoundTrip() {
        return returnDate != null;
    }

    // Enums
    public enum TransportType {
        FLIGHT, TRAIN, BUS, HOTEL, CAR_RENTAL
    }

    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED, COMPLETED, EXPIRED, REFUNDED
    }

    public enum PaymentStatus {
        PENDING, PROCESSING, COMPLETED, FAILED, REFUNDED, PARTIALLY_REFUNDED
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", bookingReference='" + bookingReference + '\'' +
                ", transportType=" + transportType +
                ", origin='" + origin + '\'' +
                ", destination='" + destination + '\'' +
                ", travelDate=" + travelDate +
                ", status=" + status +
                ", paymentStatus=" + paymentStatus +
                '}';
    }
}

