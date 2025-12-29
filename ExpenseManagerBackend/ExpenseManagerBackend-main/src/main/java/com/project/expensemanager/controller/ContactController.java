package com.project.expensemanager.controller;

import com.project.expensemanager.entity.ContactMessage;
import com.project.expensemanager.repository.ContactRepository;
import com.project.expensemanager.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@Tag(name = "Contact", description = "API for contact form")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private EmailService emailService;

    @Operation(summary = "Submit a contact message")
    @PostMapping
    public String submitMessage(@RequestBody ContactMessage message) {
        contactRepository.save(message);

        // Send notification email (optional)
        emailService.sendEmail(
                "makarandgoralkar27@gmail.com",
                "New Contact Message from " + message.getName(),
                "Email: " + message.getEmail() + "\n\nMessage: " + message.getMessage()
        );

        return "Message sent successfully!";
    }
}
