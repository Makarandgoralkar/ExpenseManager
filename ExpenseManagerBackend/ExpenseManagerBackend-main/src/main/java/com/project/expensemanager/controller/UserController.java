package com.project.expensemanager.controller;

import com.project.expensemanager.entity.User;
import com.project.expensemanager.service.UserService;
import com.project.expensemanager.security.jwt.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@Tag(name = "User", description = "APIs to manage user profile")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Operation(summary = "Get profile", description = "Returns current authenticated user's profile")
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.getEmailFromToken(token);
        User user = userService.getUserByEmail(email);
        if (user == null) return ResponseEntity.badRequest().body("User not found");
        user.setPassword(null); // hide password
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Update profile", description = "Update authenticated user's name, email, or password")
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader,
            @RequestBody User updatedUser) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.getEmailFromToken(token);
        User user = userService.getUserByEmail(email);
        if (user == null) return ResponseEntity.badRequest().body("User not found");
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        userService.saveUser(user);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @Operation(summary = "Delete account", description = "Delete the current authenticated user's account")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.getEmailFromToken(token);
            User user = userService.getUserByEmail(email);
            if (user == null) return ResponseEntity.badRequest().body("User not found");

            userService.deleteUser(user.getId());
            return ResponseEntity.ok("Account deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete account");
        }
    }
}
