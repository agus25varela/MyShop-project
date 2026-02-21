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
            return ResponseEntity.badRequest().body(new AuthResponse("El email ya existe", null, null, null));
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
        return ResponseEntity.ok(new AuthResponse("Usuario registrado con éxito", "temp_token", user.getRole().toString(), user.getUsername()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return userRepository.findByEmail(loginRequest.getEmail())
        .map(user -> {
            // Comparar la contraseña enviada con la encriptada en DB
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) { 

                return ResponseEntity.ok(new AuthResponse(
                    "Login exitoso", 
                    "token_temp" + user.getId(), // Placeholder de token
                    user.getRole().name(), 
                    user.getUsername()
                ));
            } else {
                return ResponseEntity.status(401).body("Contraseña incorrecta");
            }
        })
        .orElse(ResponseEntity.status(404).body("Usuario no encontrado"));
    }
}