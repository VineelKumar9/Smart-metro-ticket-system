package com.metrolink.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class Ticket {
    private String ticketId;
    private String userId;
    private String fromStationId;
    private String toStationId;
    private String ticketTypeId;
    private int passengers;
    private BigDecimal fare;
    private LocalDate travelDate;
    private String travelTime;
    private LocalDateTime bookingDate;
    private String status;
    private String qrCode;

    // Station names for display
    private String fromStationName;
    private String toStationName;
    private String ticketTypeName;

    // Constructors
    public Ticket() {}

    public Ticket(String ticketId, String userId, String fromStationId, String toStationId,
                  String ticketTypeId, int passengers, BigDecimal fare, LocalDate travelDate,
                  String travelTime, String status) {
        this.ticketId = ticketId;
        this.userId = userId;
        this.fromStationId = fromStationId;
        this.toStationId = toStationId;
        this.ticketTypeId = ticketTypeId;
        this.passengers = passengers;
        this.fare = fare;
        this.travelDate = travelDate;
        this.travelTime = travelTime;
        this.status = status;
    }

    // Getters and Setters
    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getFromStationId() { return fromStationId; }
    public void setFromStationId(String fromStationId) { this.fromStationId = fromStationId; }

    public String getToStationId() { return toStationId; }
    public void setToStationId(String toStationId) { this.toStationId = toStationId; }

    public String getTicketTypeId() { return ticketTypeId; }
    public void setTicketTypeId(String ticketTypeId) { this.ticketTypeId = ticketTypeId; }

    public int getPassengers() { return passengers; }
    public void setPassengers(int passengers) { this.passengers = passengers; }

    public BigDecimal getFare() { return fare; }
    public void setFare(BigDecimal fare) { this.fare = fare; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    public String getTravelTime() { return travelTime; }
    public void setTravelTime(String travelTime) { this.travelTime = travelTime; }

    public LocalDateTime getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getQrCode() { return qrCode; }
    public void setQrCode(String qrCode) { this.qrCode = qrCode; }

    public String getFromStationName() { return fromStationName; }
    public void setFromStationName(String fromStationName) { this.fromStationName = fromStationName; }

    public String getToStationName() { return toStationName; }
    public void setToStationName(String toStationName) { this.toStationName = toStationName; }

    public String getTicketTypeName() { return ticketTypeName; }
    public void setTicketTypeName(String ticketTypeName) { this.ticketTypeName = ticketTypeName; }
}