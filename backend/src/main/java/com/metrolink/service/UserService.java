package com.metrolink.service;

import com.metrolink.model.User;
import com.metrolink.dto.RegisterRequest;
import com.metrolink.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new RuntimeException("User with this email already exists");
        }

        // Create new user
        User user = new User();
        user.setUserId(UUID.randomUUID().toString());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setBalance(new BigDecimal("0.00"));
        user.setRole("user");

        return userRepository.save(user);
    }

    public User authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPasswordHash())) {
            return user;
        }
        return null;
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId);
    }

    public User updateUser(User user) {
        return userRepository.update(user);
    }

    public void rechargeWallet(String userId, BigDecimal amount, String paymentMethod, String paymentReference) {
        userRepository.rechargeWallet(userId, amount, paymentMethod, paymentReference);
    }

    public BigDecimal getUserBalance(String userId) {
        User user = userRepository.findById(userId);
        return user != null ? user.getBalance() : BigDecimal.ZERO;
    }
}