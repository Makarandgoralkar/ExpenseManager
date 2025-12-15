package com.project.expensemanager.repository;

import com.project.expensemanager.entity.Expense;
import com.project.expensemanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(User user);

    List<Expense> findByUserAndCategory(User user, Expense.Category category);

    List<Expense> findByUserAndDate(User user, LocalDate date);

    List<Expense> findByUserAndDateBetween(User user, LocalDate start, LocalDate end);

    List<Expense> findByUserAndTitleContainingIgnoreCase(User user, String title);

    List<Expense> findByUserAndAmount(User user, Double amount);

    @Query("SELECT e FROM Expense e WHERE e.user = :user AND str(e.category) LIKE %:category%")
    List<Expense> findByUserAndCategory(User user, String category);


    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user = :user")
    Double getTotalExpenseAmount(User user);

    @Query("SELECT e FROM Expense e WHERE e.user = :user AND " +
            "(LOWER(e.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR str(e.amount) LIKE %:keyword% " +
            "OR LOWER(str(e.category)) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(str(e.type)) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Expense> searchByKeyword(@Param("user") User user, @Param("keyword") String keyword);

}
