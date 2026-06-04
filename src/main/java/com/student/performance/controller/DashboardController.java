package com.student.performance.controller;

import com.student.performance.model.AcademicRecord;
import com.student.performance.repository.AcademicRecordRepository;
import com.student.performance.repository.StudentRepository;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    private final StudentRepository studentRepository;
    private final AcademicRecordRepository recordRepository;

    public DashboardController(StudentRepository studentRepository,
                               AcademicRecordRepository recordRepository) {
        this.studentRepository = studentRepository;
        this.recordRepository = recordRepository;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {

        List<AcademicRecord> records = recordRepository.findAll();

        int totalStudents = (int) studentRepository.findAll()
                .stream()
                .filter(s -> "STUDENT".equalsIgnoreCase(s.getRole()))
                .count();

        double totalScore = 0;
        int highRiskCount = 0;

        Map<String, Integer> gradeDistribution = new HashMap<>();
        List<Map<String, Object>> scoreList = new ArrayList<>();

        for (AcademicRecord record : records) {

            if (record == null) continue;

            double predictedScore =
                    (record.getInternalMarks() * 0.3) +
                    (record.getAssignmentMarks() * 0.2) +
                    (record.getAttendance() * 0.2) +
                    ((record.getStudyHours() / 10.0) * 10) +
                    ((record.getPreviousGpa() / 10.0) * 20);

            totalScore += predictedScore;

            String grade;
            if (predictedScore >= 80) {
                grade = "A";
            } else if (predictedScore >= 60) {
                grade = "B";
            } else {
                grade = "C";
                highRiskCount++;
            }

            gradeDistribution.put(grade,
                    gradeDistribution.getOrDefault(grade, 0) + 1);

            Map<String, Object> scoreMap = new HashMap<>();

            // 🔥 SAFE student access
            if (record.getStudent() != null) {
                scoreMap.put("name", record.getStudent().getName());
            } else {
                scoreMap.put("name", "Unknown");
            }

            scoreMap.put("score", Math.round(predictedScore * 100.0) / 100.0);

            scoreList.add(scoreMap);
        }

        double averageScore = records.isEmpty()
                ? 0
                : totalScore / records.size();

        Map<String, Object> response = new HashMap<>();
        response.put("totalStudents", totalStudents);
        response.put("averageScore", Math.round(averageScore * 100.0) / 100.0);
        response.put("highRiskCount", highRiskCount);
        response.put("gradeDistribution", gradeDistribution);
        response.put("scores", scoreList);

        return response;
    }
}