package com.metrolink.controller;

import com.metrolink.model.Ticket;
import com.metrolink.service.TicketService;
import com.metrolink.dto.BookTicketRequest;
import com.metrolink.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/book")
    public ResponseEntity<ApiResponse<Ticket>> bookTicket(@RequestBody BookTicketRequest request) {
        try {
            Ticket ticket = ticketService.bookTicket(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Ticket booked successfully", ticket));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<Ticket>>> getUserTickets(@PathVariable String userId) {
        try {
            List<Ticket> tickets = ticketService.getUserTickets(userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Tickets retrieved successfully", tickets));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{ticketId}")
    public ResponseEntity<ApiResponse<Ticket>> getTicketById(@PathVariable String ticketId) {
        try {
            Ticket ticket = ticketService.getTicketById(ticketId);
            if (ticket != null) {
                return ResponseEntity.ok(new ApiResponse<>(true, "Ticket found", ticket));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping("/{ticketId}/cancel")
    public ResponseEntity<ApiResponse<String>> cancelTicket(@PathVariable String ticketId) {
        try {
            ticketService.cancelTicket(ticketId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Ticket cancelled successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/calculate-fare")
    public ResponseEntity<ApiResponse<BigDecimal>> calculateFare(
            @RequestParam String fromStationId,
            @RequestParam String toStationId,
            @RequestParam String ticketTypeId,
            @RequestParam(defaultValue = "1") int passengers) {
        try {
            BigDecimal fare = ticketService.calculateFare(fromStationId, toStationId, ticketTypeId, passengers);
            return ResponseEntity.ok(new ApiResponse<>(true, "Fare calculated successfully", fare));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Ticket>>> getAllTickets() {
        try {
            List<Ticket> tickets = ticketService.getAllTickets();
            return ResponseEntity.ok(new ApiResponse<>(true, "All tickets retrieved successfully", tickets));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}