package com.project.expensemanager.service;

import com.project.expensemanager.entity.Expense;
import com.project.expensemanager.entity.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ExpenseService {
    Expense addExpense(Expense expense, User user);
    Expense updateExpense(Long id, Expense expense, User user);
    Expense getExpenseById(Long id, User user);
    void deleteExpense(Long id, User user);
    List<Expense> getUserExpenses(User user);
    Map<String, Double> getCategorySummary(User user);
    Map<String, Double> getTotalIncomeExpense(User user);
    List<Expense> getExpensesByCategory(User user, Expense.Category category);
    List<Expense> getExpensesByDate(User user, LocalDate date);
    List<Expense> getExpensesBetweenDates(User user, LocalDate start, LocalDate end);

    Double getTotalExpenseAmount(User user);
    List<Expense> searchExpensesByTitle(User user, String keyword);
    List<Expense> searchExpensesByAmount(User user, Double amount);
    List<Expense> searchExpensesByCategoryName(User user, String category);
    Map<String, Double> getCategoryPercentage(User user);

    List<Expense> searchExpenses(User user, String keyword);

    Map<String, Double> getCategorySummaryByFilter(
            User user,
            String type,
            LocalDate date,
            LocalDate startDate,
            LocalDate endDate
    );

}
