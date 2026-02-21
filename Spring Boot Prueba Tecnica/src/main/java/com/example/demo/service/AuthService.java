package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {
        // 1. Validar si el email ya existe
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        // 2. Crear el nuevo usuario 
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        // Encriptar password con BCrypt antes de guardar 
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_USER); // Rol por defecto 

        userRepository.save(user);
        return "Usuario registrado exitosamente";
    }
}