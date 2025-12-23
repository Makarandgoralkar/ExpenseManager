package com.project.expensemanager.repository;

import com.project.expensemanager.entity.ScheduledTransaction;
import com.project.expensemanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduledTransactionRepository extends JpaRepository<ScheduledTransaction, Long> {
    List<ScheduledTransaction> findByUser(User user);
}
