package com.project.expensemanager.service.impl;

import com.project.expensemanager.entity.Expense;
import com.project.expensemanager.entity.Expense.ExpenseType;
import com.project.expensemanager.entity.User;
import com.project.expensemanager.repository.ExpenseRepository;
import com.project.expensemanager.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Override
    public Expense getExpenseById(Long id, User user) {
        Expense e = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!e.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return e;
    }

    @Override
    public Expense addExpense(Expense expense, User user) {
        expense.setUser(user);
        return expenseRepository.save(expense);
    }

    @Override
    public Expense updateExpense(Long id, Expense expense, User user) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
        if (!existing.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        existing.setTitle(expense.getTitle());
        existing.setAmount(expense.getAmount());
        existing.setCategory(expense.getCategory());
        existing.setType(expense.getType());
        existing.setDate(expense.getDate());
        return expenseRepository.save(existing);
    }

    @Override
    public void deleteExpense(Long id, User user) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
        if (!existing.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        expenseRepository.delete(existing);
    }

    @Override
    public List<Expense> getUserExpenses(User user) {
        return expenseRepository.findByUser(user);
    }

    @Override
    public Map<String, Double> getCategorySummary(User user) {
        List<Expense> expenses = expenseRepository.findByUser(user);
        Map<String, Double> summary = new HashMap<>();
        for (Expense e : expenses) {
            String category = e.getCategory().name();
            summary.put(category, summary.getOrDefault(category, 0.0) + e.getAmount());
        }
        return summary;
    }

    @Override
    public Map<String, Double> getTotalIncomeExpense(User user) {
        List<Expense> expenses = expenseRepository.findByUser(user);
        double income = 0, expense = 0;
        for (Expense e : expenses) {
            if (e.getType() == ExpenseType.INCOME) income += e.getAmount();
            else expense += e.getAmount();
        }
        Map<String, Double> map = new HashMap<>();
        map.put("totalIncome", income);
        map.put("totalExpense", expense);
        return map;
    }

    @Override
    public List<Expense> getExpensesByCategory(User user, Expense.Category category) {
        return expenseRepository.findByUserAndCategory(user, category);
    }

    @Override
    public List<Expense> getExpensesByDate(User user, LocalDate date) {
        return expenseRepository.findByUserAndDate(user, date);
    }

    @Override
    public List<Expense> getExpensesBetweenDates(User user, LocalDate start, LocalDate end) {
        return expenseRepository.findByUserAndDateBetween(user, start, end);
    }

    @Override
    public Double getTotalExpenseAmount(User user) {
        Double total = expenseRepository.getTotalExpenseAmount(user);
        return total != null ? total : 0.0;
    }

    @Override
    public List<Expense> searchExpensesByTitle(User user, String keyword) {
        return expenseRepository.findByUserAndTitleContainingIgnoreCase(user, keyword);
    }

    @Override
    public List<Expense> searchExpensesByAmount(User user, Double amount) {
        return expenseRepository.findByUserAndAmount(user, amount);
    }

    @Override
    public List<Expense> searchExpensesByCategoryName(User user, String category) {
        return expenseRepository.findByUserAndCategory(user, category.toUpperCase());
    }

    @Override
    public Map<String, Double> getCategoryPercentage(User user) {
        List<Expense> expenses = expenseRepository.findByUser(user);
        double total = expenses.stream().mapToDouble(Expense::getAmount).sum();

        Map<String, Double> percentageMap = new HashMap<>();
        for (Expense e : expenses) {
            String category = e.getCategory().name();
            percentageMap.put(category,
                    percentageMap.getOrDefault(category, 0.0) + e.getAmount());
        }

        percentageMap.replaceAll((k, v) -> (v / total) * 100);

        return percentageMap;
    }

    @Override
    public List<Expense> searchExpenses(User user, String keyword) {
        return expenseRepository.searchByKeyword(user, keyword);
    }

    @Override
    public Map<String, Double> getCategorySummaryByFilter(
            User user,
            String type,
            LocalDate date,
            LocalDate startDate,
            LocalDate endDate
    ) {

        List<Expense> expenses;

        switch (type) {

            case "DATE":
                expenses = expenseRepository.findByUserAndDate(user, date);
                break;

            case "WEEK":
                expenses = expenseRepository.findByUserAndDateBetween(
                        user, startDate, endDate
                );
                break;

            case "MONTH":
                LocalDate monthStart = date.withDayOfMonth(1);
                LocalDate monthEnd = date.withDayOfMonth(date.lengthOfMonth());
                expenses = expenseRepository.findByUserAndDateBetween(
                        user, monthStart, monthEnd
                );
                break;

            case "YEAR":
                LocalDate yearStart = LocalDate.of(date.getYear(), 1, 1);
                LocalDate yearEnd = LocalDate.of(date.getYear(), 12, 31);
                expenses = expenseRepository.findByUserAndDateBetween(
                        user, yearStart, yearEnd
                );
                break;

            default:
                expenses = List.of();
        }

        Map<String, Double> summary = new HashMap<>();
        for (Expense e : expenses) {
            summary.merge(
                    e.getCategory().name(),
                    e.getAmount(),
                    Double::sum
            );
        }

        return summary;
    }


}
