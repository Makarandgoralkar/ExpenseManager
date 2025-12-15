package com.project.expensemanager.service;

import com.project.expensemanager.entity.User;

public interface UserService {
    User saveUser(User user);
    User getUserByEmail(String email);

    void deleteUser(Long userId);

}
