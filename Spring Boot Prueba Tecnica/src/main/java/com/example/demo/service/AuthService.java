package com.example.demo.service;

import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public String register(RegisterRequest request) {
        // 1. Validar si el email ya existe
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        // 2. Crear el nuevo usuario 
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        // Encriptar password con BCrypt antes de guardar 
        user.setPassword(request.getPassword()); 
        user.setRole(Role.ROLE_USER); // Rol por defecto 

        userRepository.save(user);
        return "Usuario registrado exitosamente";
    }
}