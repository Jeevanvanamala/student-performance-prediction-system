package com.student.performance.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class AcademicRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int semester;
    private double attendance;
    private double internalMarks;
    private double assignmentMarks;
    private double studyHours;
    private double previousGpa;
    private String extracurricularActivities;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonBackReference
    private Student student;

    // ===== GETTERS AND SETTERS =====

    public Long getId() {
        return id;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public double getAttendance() {
        return attendance;
    }

    public void setAttendance(double attendance) {
        this.attendance = attendance;
    }

    public double getInternalMarks() {
        return internalMarks;
    }

    public void setInternalMarks(double internalMarks) {
        this.internalMarks = internalMarks;
    }

    public double getAssignmentMarks() {
        return assignmentMarks;
    }

    public void setAssignmentMarks(double assignmentMarks) {
        this.assignmentMarks = assignmentMarks;
    }

    public double getStudyHours() {
        return studyHours;
    }

    public void setStudyHours(double studyHours) {
        this.studyHours = studyHours;
    }

    public double getPreviousGpa() {
        return previousGpa;
    }

    public void setPreviousGpa(double previousGpa) {
        this.previousGpa = previousGpa;
    }

    public String getExtracurricularActivities() {
        return extracurricularActivities;
    }

    public void setExtracurricularActivities(String extracurricularActivities) {
        this.extracurricularActivities = extracurricularActivities;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}