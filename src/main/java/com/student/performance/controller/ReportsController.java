package com.student.performance.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.performance.model.AcademicRecord;
import com.student.performance.repository.AcademicRecordRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportsController {

    private final AcademicRecordRepository repository;

    public ReportsController(AcademicRecordRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/reports")
    public List<AcademicRecord> getReports() {
        return repository.findAll();
    }
}
