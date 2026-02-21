package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Método necesario para la autenticación y validación de emails únicos 
    Optional<User> findByEmail(String email);
}