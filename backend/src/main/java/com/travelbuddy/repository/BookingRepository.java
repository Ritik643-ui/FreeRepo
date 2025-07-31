package com.travelbuddy.repository;

import com.travelbuddy.entity.Booking;
import com.travelbuddy.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * BookingRepository - Data access layer for Booking entity
 * 
 * Provides CRUD operations and custom queries for booking management
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    /**
     * Find booking by booking reference
     */
    Optional<Booking> findByBookingReference(String bookingReference);

    /**
     * Find bookings by user
     */
    List<Booking> findByUser(User user);

    /**
     * Find bookings by user with pagination
     */
    Page<Booking> findByUser(User user, Pageable pageable);

    /**
     * Find bookings by user ID
     */
    List<Booking> findByUserId(Long userId);

    /**
     * Find bookings by status
     */
    List<Booking> findByStatus(Booking.BookingStatus status);

    /**
     * Find bookings by payment status
     */
    List<Booking> findByPaymentStatus(Booking.PaymentStatus paymentStatus);

    /**
     * Find bookings by transport type
     */
    List<Booking> findByTransportType(Booking.TransportType transportType);

    /**
     * Find bookings by origin and destination
     */
    @Query("SELECT b FROM Booking b WHERE LOWER(b.origin) = LOWER(:origin) AND LOWER(b.destination) = LOWER(:destination)")
    List<Booking> findByOriginAndDestination(@Param("origin") String origin, @Param("destination") String destination);

    /**
     * Find bookings by travel date range
     */
    @Query("SELECT b FROM Booking b WHERE b.travelDate BETWEEN :startDate AND :endDate")
    List<Booking> findByTravelDateBetween(@Param("startDate") LocalDateTime startDate, 
                                         @Param("endDate") LocalDateTime endDate);

    /**
     * Find expired bookings
     */
    @Query("SELECT b FROM Booking b WHERE b.bookingExpiresAt < CURRENT_TIMESTAMP AND b.status = 'PENDING'")
    List<Booking> findExpiredBookings();

    /**
     * Find bookings expiring soon
     */
    @Query("SELECT b FROM Booking b WHERE b.bookingExpiresAt BETWEEN CURRENT_TIMESTAMP AND :expiryTime AND b.status = 'PENDING'")
    List<Booking> findBookingsExpiringSoon(@Param("expiryTime") LocalDateTime expiryTime);

    /**
     * Find bookings by confirmation number
     */
    Optional<Booking> findByConfirmationNumber(String confirmationNumber);

    /**
     * Find user's recent bookings
     */
    @Query("SELECT b FROM Booking b WHERE b.user.id = :userId ORDER BY b.createdAt DESC")
    List<Booking> findRecentBookingsByUser(@Param("userId") Long userId, Pageable pageable);

    /**
     * Find bookings created between dates
     */
    @Query("SELECT b FROM Booking b WHERE b.createdAt BETWEEN :startDate AND :endDate")
    List<Booking> findBookingsCreatedBetween(@Param("startDate") LocalDateTime startDate, 
                                           @Param("endDate") LocalDateTime endDate);

    /**
     * Count bookings by status
     */
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status = :status")
    Long countByStatus(@Param("status") Booking.BookingStatus status);

    /**
     * Count bookings by user
     */
    Long countByUser(User user);

    /**
     * Count bookings by transport type
     */
    Long countByTransportType(Booking.TransportType transportType);

    /**
     * Calculate total revenue
     */
    @Query("SELECT SUM(b.finalAmount) FROM Booking b WHERE b.paymentStatus = 'COMPLETED'")
    BigDecimal calculateTotalRevenue();

    /**
     * Calculate revenue by date range
     */
    @Query("SELECT SUM(b.finalAmount) FROM Booking b WHERE b.paymentStatus = 'COMPLETED' " +
           "AND b.createdAt BETWEEN :startDate AND :endDate")
    BigDecimal calculateRevenueBetween(@Param("startDate") LocalDateTime startDate, 
                                      @Param("endDate") LocalDateTime endDate);

    /**
     * Find top destinations
     */
    @Query("SELECT b.destination, COUNT(b) as bookingCount FROM Booking b " +
           "WHERE b.status = 'CONFIRMED' GROUP BY b.destination ORDER BY bookingCount DESC")
    List<Object[]> findTopDestinations(Pageable pageable);

    /**
     * Find popular routes
     */
    @Query("SELECT b.origin, b.destination, COUNT(b) as bookingCount FROM Booking b " +
           "WHERE b.status = 'CONFIRMED' GROUP BY b.origin, b.destination ORDER BY bookingCount DESC")
    List<Object[]> findPopularRoutes(Pageable pageable);

    /**
     * Search bookings by multiple criteria
     */
    @Query("SELECT b FROM Booking b WHERE " +
           "(:userId IS NULL OR b.user.id = :userId) AND " +
           "(:status IS NULL OR b.status = :status) AND " +
           "(:transportType IS NULL OR b.transportType = :transportType) AND " +
           "(:origin IS NULL OR LOWER(b.origin) LIKE LOWER(CONCAT('%', :origin, '%'))) AND " +
           "(:destination IS NULL OR LOWER(b.destination) LIKE LOWER(CONCAT('%', :destination, '%'))) AND " +
           "(:startDate IS NULL OR b.travelDate >= :startDate) AND " +
           "(:endDate IS NULL OR b.travelDate <= :endDate)")
    Page<Booking> searchBookings(@Param("userId") Long userId,
                                @Param("status") Booking.BookingStatus status,
                                @Param("transportType") Booking.TransportType transportType,
                                @Param("origin") String origin,
                                @Param("destination") String destination,
                                @Param("startDate") LocalDateTime startDate,
                                @Param("endDate") LocalDateTime endDate,
                                Pageable pageable);

    /**
     * Find bookings requiring action (pending payment, expiring soon)
     */
    @Query("SELECT b FROM Booking b WHERE " +
           "(b.status = 'PENDING' AND b.paymentStatus = 'PENDING') OR " +
           "(b.bookingExpiresAt BETWEEN CURRENT_TIMESTAMP AND :alertTime)")
    List<Booking> findBookingsRequiringAction(@Param("alertTime") LocalDateTime alertTime);

    /**
     * Find bookings by payment transaction ID
     */
    Optional<Booking> findByPaymentTransactionId(String transactionId);

    /**
     * Find round trip bookings
     */
    @Query("SELECT b FROM Booking b WHERE b.returnDate IS NOT NULL")
    List<Booking> findRoundTripBookings();

    /**
     * Find one-way bookings
     */
    @Query("SELECT b FROM Booking b WHERE b.returnDate IS NULL")
    List<Booking> findOneWayBookings();

    /**
     * Count bookings created today
     */
    @Query("SELECT COUNT(b) FROM Booking b WHERE DATE(b.createdAt) = CURRENT_DATE")
    Long countBookingsCreatedToday();

    /**
     * Count bookings created this month
     */
    @Query("SELECT COUNT(b) FROM Booking b WHERE YEAR(b.createdAt) = YEAR(CURRENT_DATE) " +
           "AND MONTH(b.createdAt) = MONTH(CURRENT_DATE)")
    Long countBookingsCreatedThisMonth();

    /**
     * Find bookings with special requests
     */
    @Query("SELECT b FROM Booking b WHERE b.specialRequests IS NOT NULL AND b.specialRequests != ''")
    List<Booking> findBookingsWithSpecialRequests();

    /**
     * Calculate average booking value
     */
    @Query("SELECT AVG(b.finalAmount) FROM Booking b WHERE b.paymentStatus = 'COMPLETED'")
    BigDecimal calculateAverageBookingValue();

    /**
     * Find bookings by amount range
     */
    @Query("SELECT b FROM Booking b WHERE b.finalAmount BETWEEN :minAmount AND :maxAmount")
    List<Booking> findBookingsByAmountRange(@Param("minAmount") BigDecimal minAmount, 
                                           @Param("maxAmount") BigDecimal maxAmount);
}

