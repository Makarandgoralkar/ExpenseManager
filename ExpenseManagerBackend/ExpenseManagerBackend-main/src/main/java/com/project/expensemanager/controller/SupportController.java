package com.project.expensemanager.controller;

import com.project.expensemanager.entity.SupportTicket;
import com.project.expensemanager.entity.User;
import com.project.expensemanager.repository.SupportTicketRepository;
import com.project.expensemanager.security.jwt.JwtUtil;
import com.project.expensemanager.service.EmailService;
import com.project.expensemanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/support")
public class SupportController {

    @Autowired
    private SupportTicketRepository supportRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    private static final String UPLOAD_DIR = "uploads/support/";

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> submitSupport(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam String type,
            @RequestParam String subject,
            @RequestParam String message,
            @RequestParam(required = false) Integer rating,
            @RequestParam(required = false) MultipartFile attachment
    ) throws Exception {

        String token = authHeader.substring(7);
        String email = jwtUtil.getEmailFromToken(token);
        User user = userService.getUserByEmail(email);

        SupportTicket ticket = new SupportTicket();
        ticket.setType(type);
        ticket.setSubject(subject);
        ticket.setMessage(message);
        ticket.setRating(rating);
        ticket.setUser(user);

        // File upload
        if (attachment != null && !attachment.isEmpty()) {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            Path path = Paths.get(UPLOAD_DIR + attachment.getOriginalFilename());
            Files.write(path, attachment.getBytes());
            ticket.setAttachmentPath(path.toString());
        }

        supportRepo.save(ticket);

        // Send email to Admin
        emailService.sendEmail(
                "makarandgoralkar27@gmail.com",
                "New " + type + " Received",
                "User: " + user.getEmail() +
                        "\nSubject: " + subject +
                        "\nMessage: " + message +
                        (rating != null ? "\nRating: " + rating + " ⭐" : "")
        );

        return ResponseEntity.ok("Submitted successfully");
    }
}
