package com.student.performance.controller;

import com.student.performance.model.AcademicRecord;
import com.student.performance.model.Student;
import com.student.performance.repository.AcademicRecordRepository;
import com.student.performance.repository.StudentRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PredictionController {

    private final StudentRepository studentRepository;
    private final AcademicRecordRepository academicRecordRepository;

    public PredictionController(StudentRepository studentRepository,
                                AcademicRecordRepository academicRecordRepository) {
        this.studentRepository = studentRepository;
        this.academicRecordRepository = academicRecordRepository;
    }

    @GetMapping("/predict-ml/{studentId}")
    public ResponseEntity<?> predictML(@PathVariable Long studentId) {

        Optional<Student> studentOpt = studentRepository.findById(studentId);

        if (studentOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        AcademicRecord record =
                academicRecordRepository.findTopByStudent_IdOrderByIdDesc(studentId);

        if (record == null) {
            return ResponseEntity.badRequest()
                    .body("No academic record found for this student");
        }

        try {
            RestTemplate restTemplate = new RestTemplate();
            String mlUrl = "http://127.0.0.1:5000/predict";

            Map<String, Object> request = new HashMap<>();
            request.put("internalMarks", record.getInternalMarks());
            request.put("attendance", record.getAttendance());
            request.put("assignmentMarks", record.getAssignmentMarks());
            request.put("studyHours", record.getStudyHours());
            request.put("previousGpa", record.getPreviousGpa());

            Map response = restTemplate.postForObject(mlUrl, request, Map.class);

            double predictedScore =
                    Double.parseDouble(response.get("predictedScore").toString());

            predictedScore = Math.min(predictedScore, 100);

            String selectedModel = response.get("selectedModel").toString();
            String r2Score = response.get("r2Score").toString();

            Map featureImportance =
                    (Map) response.get("featureImportance");

            Map allModels =
                    (Map) response.get("allModels");

            String grade;
            String riskLevel;

            if (predictedScore >= 75) {
                grade = "A";
                riskLevel = "Low";
            } else if (predictedScore >= 50) {
                grade = "B";
                riskLevel = "Medium";
            } else {
                grade = "C";
                riskLevel = "High";
            }

            return ResponseEntity.ok(
                    Map.of(
                            "studentName", studentOpt.get().getName(),
                            "predictedScore", predictedScore,
                            "grade", grade,
                            "riskLevel", riskLevel,
                            "model", selectedModel,
                            "accuracy", r2Score,
                            "featureImportance", featureImportance,
                            "allModels", allModels
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("ML Service not available. Make sure Python server is running.");
        }
    }
}