package com.metrolink.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Station {
    private String stationId;
    private String stationName;
    private String lineId;
    private int stationOrder;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private boolean isInterchange;
    private boolean isTerminal;
    private boolean isActive;
    private LocalDateTime createdAt;

    // Line information for display
    private String lineName;
    private String lineColor;

    // Constructors
    public Station() {}

    public Station(String stationId, String stationName, String lineId, int stationOrder) {
        this.stationId = stationId;
        this.stationName = stationName;
        this.lineId = lineId;
        this.stationOrder = stationOrder;
        this.isActive = true;
    }

    // Getters and Setters
    public String getStationId() { return stationId; }
    public void setStationId(String stationId) { this.stationId = stationId; }

    public String getStationName() { return stationName; }
    public void setStationName(String stationName) { this.stationName = stationName; }

    public String getLineId() { return lineId; }
    public void setLineId(String lineId) { this.lineId = lineId; }

    public int getStationOrder() { return stationOrder; }
    public void setStationOrder(int stationOrder) { this.stationOrder = stationOrder; }

    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }

    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }

    public boolean isInterchange() { return isInterchange; }
    public void setInterchange(boolean interchange) { isInterchange = interchange; }

    public boolean isTerminal() { return isTerminal; }
    public void setTerminal(boolean terminal) { isTerminal = terminal; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getLineName() { return lineName; }
    public void setLineName(String lineName) { this.lineName = lineName; }

    public String getLineColor() { return lineColor; }
    public void setLineColor(String lineColor) { this.lineColor = lineColor; }
}