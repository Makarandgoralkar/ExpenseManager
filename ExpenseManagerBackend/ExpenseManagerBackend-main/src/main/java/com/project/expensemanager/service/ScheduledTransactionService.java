package com.project.expensemanager.service;

import com.project.expensemanager.entity.ScheduledTransaction;
import com.project.expensemanager.entity.User;
import com.project.expensemanager.repository.ScheduledTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduledTransactionService {

    @Autowired
    private ScheduledTransactionRepository repository;

    // Get all transactions for a user
    public List<ScheduledTransaction> getAll(User user) {
        return repository.findByUser(user);
    }

    // Get by ID
    public Optional<ScheduledTransaction> getById(Long id) {
        return repository.findById(id);
    }

    // Create new transaction
    public ScheduledTransaction create(ScheduledTransaction transaction) {
        return repository.save(transaction);
    }

    // Update transaction
    public ScheduledTransaction update(Long id, ScheduledTransaction updated) {
        return repository.findById(id).map(t -> {
            t.setTitle(updated.getTitle());
            t.setAmount(updated.getAmount());
            t.setDate(updated.getDate());
            t.setFrequency(updated.getFrequency());
            return repository.save(t);
        }).orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    // Delete transaction
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
