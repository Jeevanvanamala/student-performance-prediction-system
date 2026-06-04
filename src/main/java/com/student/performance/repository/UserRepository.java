package com.student.performance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.student.performance.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
