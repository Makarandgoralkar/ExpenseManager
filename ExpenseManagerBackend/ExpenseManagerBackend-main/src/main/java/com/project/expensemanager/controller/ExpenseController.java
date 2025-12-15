package com.project.expensemanager.controller;

import com.project.expensemanager.entity.Expense;
import com.project.expensemanager.entity.User;
import com.project.expensemanager.security.jwt.JwtUtil;
import com.project.expensemanager.service.ExpenseService;
import com.project.expensemanager.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
@Tag(name = "Expenses", description = "APIs for managing expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    private User getUserFromToken(String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.getEmailFromToken(token);
        return userService.getUserByEmail(email);
    }

    @Operation(summary = "Get expense by ID", description = "Returns a single expense for authenticated user")
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader,
            @PathVariable Long id) {
        User user = getUserFromToken(authHeader);
        Expense expense = expenseService.getExpenseById(id, user);
        return ResponseEntity.ok(expense);
    }

    @Operation(summary = "Get all expenses", description = "Returns all expenses of the authenticated user")
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(expenseService.getUserExpenses(user));
    }

    @Operation(summary = "Add expense", description = "Add a new expense for the authenticated user")
    @PostMapping
    public ResponseEntity<Expense> addExpense(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader,
            @RequestBody Expense expense) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(expenseService.addExpense(expense, user));
    }

    @Operation(summary = "Update expense", description = "Update an existing expense by ID")
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader,
            @PathVariable Long id,
            @RequestBody Expense expense) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(expenseService.updateExpense(id, expense, user));
    }

    @Operation(summary = "Delete expense", description = "Delete an expense by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader,
            @PathVariable Long id) {
        User user = getUserFromToken(authHeader);
        expenseService.deleteExpense(id, user);
        return ResponseEntity.ok("Deleted successfully");
    }

    @Operation(summary = "Get category summary", description = "Returns total amount by category with optional date filters")
    @GetMapping("/analytics/category")
    public ResponseEntity<Map<String, Double>> categorySummary(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader,
            @RequestParam String type,
            @RequestParam(required = false) LocalDate date,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate
    ) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(expenseService.getCategorySummaryByFilter(user, type, date, startDate, endDate));
    }

    @Operation(summary = "Get total summary", description = "Returns total income and expense")
    @GetMapping("/analytics/summary")
    public ResponseEntity<Map<String, Double>> totalSummary(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(expenseService.getTotalIncomeExpense(user));
    }

    @Operation(summary = "Get expenses by category", description = "Returns expenses filtered by category")
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Expense>> getByCategory(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader,
            @PathVariable Expense.Category category) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(expenseService.getExpensesByCategory(user, category));
    }

    @Operation(summary = "Get expenses by date", description = "Returns expenses on a specific date")
    @GetMapping("/date/{date}")
    public ResponseEntity<List<Expense>> getByDate(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader,
            @PathVariable String date) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(expenseService.getExpensesByDate(user, LocalDate.parse(date)));
    }

    @Operation(summary = "Get expenses between dates", description = "Returns expenses between start and end date")
    @GetMapping("/between")
    public ResponseEntity<List<Expense>> getBetweenDates(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader,
            @RequestParam String start,
            @RequestParam String end) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(expenseService.getExpensesBetweenDates(user, LocalDate.parse(start), LocalDate.parse(end)));
    }

    @Operation(summary = "Get total amount", description = "Returns sum of all expenses")
    @GetMapping("/total")
    public ResponseEntity<Double> getTotalAmount(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(expenseService.getTotalExpenseAmount(user));
    }

    @Operation(summary = "Search expenses", description = "Search expenses by keyword in title, category, amount, or type")
    @GetMapping("/search")
    public ResponseEntity<List<Expense>> searchExpenses(
            @RequestHeader("Authorization") @Parameter(description = "Bearer JWT token") String authHeader,
            @RequestParam String keyword) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(expenseService.searchExpenses(user, keyword));
    }
}
