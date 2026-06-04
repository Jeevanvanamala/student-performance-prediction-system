package com.student.performance.controller;

import com.student.performance.model.Student;
import com.student.performance.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Student loginRequest) {

        Student student = studentRepository
                .findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (student == null ||
            !student.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // Simple response without JWT
        Map<String, Object> response = new HashMap<>();
        response.put("role", student.getRole());
        response.put("id", student.getId());
        response.put("name", student.getName());

        return ResponseEntity.ok(response);
    }
}