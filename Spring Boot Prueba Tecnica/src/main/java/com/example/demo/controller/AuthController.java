package com.example.demo.controller; // Verifica que sea el paquete correcto

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.RegisterRequest;
import com.example.demo.service.AuthService;

@RestController // Obligatorio
@RequestMapping("/api/auth") 
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")  
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }
}