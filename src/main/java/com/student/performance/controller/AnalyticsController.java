package com.student.performance.controller;

import com.student.performance.model.AcademicRecord;
import com.student.performance.repository.AcademicRecordRepository;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController {

    private final AcademicRecordRepository recordRepository;

    public AnalyticsController(AcademicRecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @GetMapping("/analytics")
    public Map<String, Object> getAnalytics() {

        List<AcademicRecord> records = recordRepository.findAll();

        int lowRisk = 0;
        int mediumRisk = 0;
        int highRisk = 0;

        for (AcademicRecord record : records) {

            if (record == null) continue;

            double predictedScore =
                    (record.getInternalMarks() * 0.3) +
                    (record.getAssignmentMarks() * 0.2) +
                    (record.getAttendance() * 0.2) +
                    ((record.getStudyHours() / 10.0) * 10) +
                    ((record.getPreviousGpa() / 10.0) * 20);

            if (predictedScore >= 80) {
                lowRisk++;
            } else if (predictedScore >= 60) {
                mediumRisk++;
            } else {
                highRisk++;
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("lowRisk", lowRisk);
        response.put("mediumRisk", mediumRisk);
        response.put("highRisk", highRisk);

        return response;
    }
}