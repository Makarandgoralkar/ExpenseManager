package com.project.expensemanager.controller;

import com.project.expensemanager.entity.ScheduledTransaction;
import com.project.expensemanager.entity.User;
import com.project.expensemanager.service.ScheduledTransactionService;
import com.project.expensemanager.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scheduled-transactions")
public class ScheduledTransactionController {

    @Autowired
    private ScheduledTransactionService transactionService;

    @Autowired
    private UserService userService;

    @Operation(summary = "Get All Scheduled Transactions", description = "Retrieve all scheduled transactions belonging to the authenticated user.")
    @GetMapping
    public List<ScheduledTransaction> getAll(Authentication auth) {
        User user = userService.getUserByEmail(auth.getName());
        return transactionService.getAll(user);
    }

    @Operation(summary = "Get Transaction by Id", description = "Retrieve a specific scheduled transaction by its ID for the authenticated user.")
    @GetMapping("/{id}")
    public ResponseEntity<ScheduledTransaction> getById(@PathVariable Long id, Authentication auth) {
        User user = userService.getUserByEmail(auth.getName());
        return transactionService.getById(id)
                .filter(t -> t.getUser().getId().equals(user.getId()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(403).build());
    }

    @Operation(summary = "Create Scheduled Transaction", description = "Create a new scheduled transaction for the authenticated user.")
    @PostMapping
    public ResponseEntity<ScheduledTransaction> create(@RequestBody ScheduledTransaction transaction,
                                                       Authentication auth) {
        User user = userService.getUserByEmail(auth.getName());
        transaction.setUser(user);
        return ResponseEntity.ok(transactionService.create(transaction));
    }

    @Operation(summary = "Update Scheduled Transaction", description = "Update an existing scheduled transaction belonging to the authenticated user.")
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

    @Operation(summary = "Delete Scheduled Transaction", description = "Delete a scheduled transaction owned by the authenticated user.")
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

    @Operation(summary = "Mark as Completed", description = "Mark a scheduled transaction as completed for the authenticated user.")
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
