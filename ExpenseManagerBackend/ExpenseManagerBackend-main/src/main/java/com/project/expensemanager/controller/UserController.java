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
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/profile/picture")
    public ResponseEntity<?> getProfilePicture(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.getEmailFromToken(token);
            User user = userService.getUserByEmail(email);
            if (user == null || user.getProfilePicture() == null) return ResponseEntity.notFound().build();

            // Convert byte[] to Base64 string
            String base64Image = java.util.Base64.getEncoder().encodeToString(user.getProfilePicture());
            return ResponseEntity.ok(base64Image);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching profile picture");
        }
    }

    @PostMapping("/profile/upload")
    public ResponseEntity<?> uploadProfilePicture(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam("file") MultipartFile file) {

        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.getEmailFromToken(token);
            User user = userService.getUserByEmail(email);
            if (user == null) return ResponseEntity.badRequest().body("User not found");

            // Convert file to byte array
            user.setProfilePicture(file.getBytes());
            userService.saveUser(user);

            return ResponseEntity.ok("Profile picture uploaded successfully");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Profile picture upload failed");
        }
    }

    @DeleteMapping("/profile/picture")
    public ResponseEntity<?> deleteProfilePicture(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.getEmailFromToken(token);
        User user = userService.getUserByEmail(email);

        if (user == null) return ResponseEntity.badRequest().body("User not found");

        user.setProfilePicture(null);
        userService.saveUser(user);

        return ResponseEntity.ok("Profile picture removed");
    }


}
