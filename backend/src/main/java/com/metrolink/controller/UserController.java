package com.metrolink.controller;

import com.metrolink.model.User;
import com.metrolink.service.UserService;
import com.metrolink.dto.LoginRequest;
import com.metrolink.dto.RegisterRequest;
import com.metrolink.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@RequestBody RegisterRequest request) {
        try {
            User user = userService.registerUser(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "User registered successfully", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> login(@RequestBody LoginRequest request) {
        try {
            User user = userService.authenticateUser(request.getEmail(), request.getPassword());
            if (user != null) {
                return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", user));
            } else {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Invalid credentials", null));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable String userId) {
        try {
            User user = userService.getUserById(userId);
            if (user != null) {
                return ResponseEntity.ok(new ApiResponse<>(true, "User found", user));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping("/{userId}/recharge")
    public ResponseEntity<ApiResponse<String>> rechargeWallet(
            @PathVariable String userId,
            @RequestParam BigDecimal amount,
            @RequestParam String paymentMethod,
            @RequestParam(required = false) String paymentReference) {
        try {
            userService.rechargeWallet(userId, amount, paymentMethod, paymentReference);
            return ResponseEntity.ok(new ApiResponse<>(true, "Wallet recharged successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<User>> updateUser(
            @PathVariable String userId,
            @RequestBody User user) {
        try {
            user.setUserId(userId);
            User updatedUser = userService.updateUser(user);
            return ResponseEntity.ok(new ApiResponse<>(true, "User updated successfully", updatedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}