package com.project.expensemanager.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private Category category;

    private LocalDate date;

    private LocalTime time;

    @Enumerated(EnumType.STRING)
    private ExpenseType type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @com.fasterxml.jackson.annotation.JsonBackReference
    private User user;



    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public LocalTime getTime() {
        return time;
    }
    public void setTime(LocalTime time) { this.time = time; }

    public ExpenseType getType() { return type; }
    public void setType(ExpenseType type) { this.type = type; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public enum Category {
        FOOD, TRAVEL, BILLS, ENTERTAINMENT, SHOPPING, MEDICAL, EDUCATION, RENT, OTHER
    }

    public enum ExpenseType {
        INCOME, EXPENSE
    }
}
