package com.student.performance.model;

public class ReportResponse {

    private String studentName;
    private int attendance;
    private int internalMarks;
    private String performance;

    public ReportResponse(String studentName, int attendance, int internalMarks, String performance) {
        this.studentName = studentName;
        this.attendance = attendance;
        this.internalMarks = internalMarks;
        this.performance = performance;
    }

    public String getStudentName() {
        return studentName;
    }

    public int getAttendance() {
        return attendance;
    }

    public int getInternalMarks() {
        return internalMarks;
    }

    public String getPerformance() {
        return performance;
    }
}
