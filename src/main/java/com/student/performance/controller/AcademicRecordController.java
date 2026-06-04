package com.student.performance.controller;

import com.student.performance.model.AcademicRecord;
import com.student.performance.model.Student;
import com.student.performance.repository.AcademicRecordRepository;
import com.student.performance.repository.StudentRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/records")
@CrossOrigin(origins = "http://localhost:3000")
public class AcademicRecordController {

    private final AcademicRecordRepository recordRepository;
    private final StudentRepository studentRepository;

    public AcademicRecordController(AcademicRecordRepository recordRepository,
                                    StudentRepository studentRepository) {
        this.recordRepository = recordRepository;
        this.studentRepository = studentRepository;
    }

    @PostMapping("/{studentId}")
    public ResponseEntity<?> addRecord(@PathVariable Long studentId,
                                       @RequestBody AcademicRecord record) {

        Optional<Student> studentOpt = studentRepository.findById(studentId);

        if (studentOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Student not found");
        }

        record.setStudent(studentOpt.get());

        return ResponseEntity.ok(recordRepository.save(record));
    }
}