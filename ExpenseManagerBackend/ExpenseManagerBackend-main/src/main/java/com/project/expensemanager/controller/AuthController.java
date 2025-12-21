package com.project.expensemanager.controller;

import com.project.expensemanager.dto.AuthRequest;
import com.project.expensemanager.dto.AuthResponse;
import com.project.expensemanager.dto.ForgotPasswordRequest;
import com.project.expensemanager.dto.ResetPasswordRequest;
import com.project.expensemanager.entity.User;
import com.project.expensemanager.service.UserService;
import com.project.expensemanager.security.jwt.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "APIs for user signup and login")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Operation(summary = "Sign up a new user", description = "Create a new user with name, email, and password")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userService.getUserByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @Operation(summary = "Login user", description = "Authenticate user and return JWT token")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        User user = userService.getUserByEmail(request.getEmail());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {

        User user = userService.getUserByEmail(request.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest().body("Email not registered");
        }

        String resetToken = jwtUtil.generateResetToken(user.getEmail());

        // 👉 In real app: send token via email
        return ResponseEntity.ok(resetToken);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {

        String email = jwtUtil.getEmailFromToken(request.getToken());
        if (email == null) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }

        User user = userService.getUserByEmail(email);
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userService.saveUser(user);

        return ResponseEntity.ok("Password reset successful");
    }

}
