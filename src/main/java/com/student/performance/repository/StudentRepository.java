package com.student.performance.repository;

import com.student.performance.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // 🔹 Required for Login
    Optional<Student> findByEmail(String email);

    // 🔹 Required for Department Filter
    List<Student> findByDepartment(String department);

}