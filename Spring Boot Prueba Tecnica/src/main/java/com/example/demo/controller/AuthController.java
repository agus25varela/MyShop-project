package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(new AuthResponse("El email ya existe", null, null));
        }

        // 1. Encriptar la contraseña
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 2. Asignar ROL (el primero es ADMIN, los demás son USER)
        if (userRepository.count() == 0) {
            user.setRole(Role.ROLE_ADMIN);
        } else {
            user.setRole(Role.ROLE_USER);
        }

        userRepository.save(user);
        return ResponseEntity.ok(new AuthResponse("Usuario registrado con éxito", "temp_token", user.getRole().toString()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(new AuthResponse("Login exitoso", "token_temp", "USER"));
    }
}