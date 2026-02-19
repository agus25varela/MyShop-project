package com.example.demo.entity;

public enum Role {
    ROLE_USER,
    ROLE_ADMIN
}

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String name;
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role; // ROLE_USER, ROLE_ADMIN 
    
    private LocalDateTime createdAt = LocalDateTime.now();
}