package com.student.performance.controller;

import com.student.performance.model.AcademicRecord;
import com.student.performance.model.Student;
import com.student.performance.repository.AcademicRecordRepository;
import com.student.performance.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private final StudentRepository studentRepository;
    private final AcademicRecordRepository academicRecordRepository;

    public StudentController(StudentRepository studentRepository,
                             AcademicRecordRepository academicRecordRepository) {
        this.studentRepository = studentRepository;
        this.academicRecordRepository = academicRecordRepository;
    }

    // ✅ ADD STUDENT
    @PostMapping
    public Student addStudent(@RequestBody Student student) {

        if (student.getRole() == null || student.getRole().isEmpty()) {
            student.setRole("STUDENT");
        }

        return studentRepository.save(student);
    }

    // ✅ GET ALL STUDENTS
    @GetMapping
    public List<Map<String, Object>> getAllStudents() {

        List<Student> students = studentRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Student student : students) {

            if (!"STUDENT".equals(student.getRole())) continue;

            AcademicRecord record =
                    academicRecordRepository.findTopByStudent_IdOrderByIdDesc(student.getId());

            Map<String, Object> map = new HashMap<>();
            map.put("id", student.getId());
            map.put("name", student.getName());
            map.put("email", student.getEmail());
            map.put("department", student.getDepartment());
            map.put("year", student.getYear());

            if (record == null) {
                map.put("riskLevel", "N/A"); // ✅ FIX
            } else {

                double score =
                        (record.getInternalMarks() * 0.4) +
                        (record.getAssignmentMarks() * 0.3) +
                        (record.getAttendance() * 0.3);

                String risk = score >= 75 ? "Low" :
                              score >= 50 ? "Medium" : "High";

                map.put("riskLevel", risk);
            }

            result.add(map);
        }

        return result;
    }
}