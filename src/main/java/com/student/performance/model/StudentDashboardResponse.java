package com.student.performance.model;

public class StudentDashboardResponse {

    private String name;
    private String department;
    private int year;

    private int attendance;
    private int internalMarks;
    private int assignmentMarks;

    private String performance;
    private String grade;
    private String result;

    public StudentDashboardResponse(
            String name, String department, int year,
            int attendance, int internalMarks, int assignmentMarks,
            String performance, String grade, String result) {

        this.name = name;
        this.department = department;
        this.year = year;
        this.attendance = attendance;
        this.internalMarks = internalMarks;
        this.assignmentMarks = assignmentMarks;
        this.performance = performance;
        this.grade = grade;
        this.result = result;
    }

    public String getName() { return name; }
    public String getDepartment() { return department; }
    public int getYear() { return year; }

    public int getAttendance() { return attendance; }
    public int getInternalMarks() { return internalMarks; }
    public int getAssignmentMarks() { return assignmentMarks; }

    public String getPerformance() { return performance; }
    public String getGrade() { return grade; }
    public String getResult() { return result; }
}
