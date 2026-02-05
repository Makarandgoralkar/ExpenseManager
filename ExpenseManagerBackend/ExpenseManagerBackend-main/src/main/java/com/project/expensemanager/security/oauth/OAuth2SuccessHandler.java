package com.project.expensemanager.security.oauth;

import com.project.expensemanager.entity.User;
import com.project.expensemanager.security.jwt.JwtUtil;
import com.project.expensemanager.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public OAuth2SuccessHandler(JwtUtil jwtUtil, UserService userService, PasswordEncoder passwordEncoder) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = token.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        if (email == null) {
            throw new IllegalStateException("Email not found from OAuth2 provider");
        }

        User user = userService.getUserByEmail(email);

        // First-time login → create user
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setName(name != null ? name : "OAuth2 User");
            // Generate a random password for OAuth2 users
            user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
            userService.saveUser(user);
        }

        String jwt = jwtUtil.generateToken(email);

        // URL encode JWT
        String redirectUrl = "http://localhost:3000/oauth2-success?token=" +
                URLEncoder.encode(jwt, StandardCharsets.UTF_8);

        response.sendRedirect(redirectUrl);
    }
}
