package com.example.demo.dto;

import lombok.Data;

@Data 
public class RegisterRequest {
    private String username;
    private String email;
    private String password;



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}