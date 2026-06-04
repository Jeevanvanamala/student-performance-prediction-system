package com.student.performance.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String department;
    private int year;

    @Column(nullable = false)
    private String role = "STUDENT"; // ✅ FIX

    // Getters & Setters

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}