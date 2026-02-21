package com.example.demo.dto;

public class AuthResponse {
    private String message;
    private String token;
    private String role;
    private String username;

    public AuthResponse(String message, String token, String role, String username) {
        this.message = message;
        this.token = token;
        this.role = role;
        this.username = username;
    }

    public String getUsername() { 
        return username; }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
