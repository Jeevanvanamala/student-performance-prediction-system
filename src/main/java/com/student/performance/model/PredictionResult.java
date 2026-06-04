package com.student.performance.model;

public class PredictionResult {

    private String performance;
    private String grade;
    private String result;

    public PredictionResult(String performance, String grade, String result) {
        this.performance = performance;
        this.grade = grade;
        this.result = result;
    }

    public String getPerformance() {
        return performance;
    }

    public String getGrade() {
        return grade;
    }

    public String getResult() {
        return result;
    }
}
