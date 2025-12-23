package com.project.expensemanager.controller;

import com.project.expensemanager.entity.ScheduledTransaction;
import com.project.expensemanager.entity.User;
import com.project.expensemanager.service.ScheduledTransactionService;
import com.project.expensemanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scheduled-transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class ScheduledTransactionController {

    @Autowired
    private ScheduledTransactionService transactionService;

    @Autowired
    private UserService userService;

    // Get all scheduled transactions for the logged-in user
    @GetMapping
    public List<ScheduledTransaction> getAll(Authentication auth) {
        User user = userService.getUserByEmail(auth.getName());
        return transactionService.getAll(user);
    }

    // Get a specific transaction by ID
    @GetMapping("/{id}")
    public ResponseEntity<ScheduledTransaction> getById(@PathVariable Long id, Authentication auth) {
        User user = userService.getUserByEmail(auth.getName());
        return transactionService.getById(id)
                .filter(t -> t.getUser().getId().equals(user.getId()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(403).build());
    }

    // Create new scheduled transaction
    @PostMapping
    public ResponseEntity<ScheduledTransaction> create(@RequestBody ScheduledTransaction transaction,
                                                       Authentication auth) {
        User user = userService.getUserByEmail(auth.getName());
        transaction.setUser(user);
        return ResponseEntity.ok(transactionService.create(transaction));
    }

    // Update scheduled transaction
    @PutMapping("/{id}")
    public ResponseEntity<ScheduledTransaction> update(@PathVariable Long id,
                                                       @RequestBody ScheduledTransaction transaction,
                                                       Authentication auth) {
        User user = userService.getUserByEmail(auth.getName());
        return transactionService.getById(id)
                .filter(t -> t.getUser().getId().equals(user.getId()))
                .map(t -> ResponseEntity.ok(transactionService.update(id, transaction)))
                .orElse(ResponseEntity.status(403).build());
    }

    // Delete scheduled transaction
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication auth) {
        User user = userService.getUserByEmail(auth.getName());
        return transactionService.getById(id)
                .filter(t -> t.getUser().getId().equals(user.getId()))
                .map(t -> {
                    transactionService.delete(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.status(403).build());
    }

    // Mark transaction as completed
    @PutMapping("/{id}/complete")
    public ResponseEntity<ScheduledTransaction> markCompleted(@PathVariable Long id, Authentication auth) {
        User user = userService.getUserByEmail(auth.getName());
        return transactionService.getById(id)
                .filter(t -> t.getUser().getId().equals(user.getId()))
                .map(t -> {
                    t.setCompleted(true);
                    return ResponseEntity.ok(transactionService.update(id, t));
                })
                .orElse(ResponseEntity.status(403).build());
    }

}
