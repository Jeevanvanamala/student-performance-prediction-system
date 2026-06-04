package com.student.performance.config;

import com.student.performance.model.AcademicRecord;
import com.student.performance.model.Student;
import com.student.performance.repository.AcademicRecordRepository;
import com.student.performance.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class DataInitializer implements CommandLineRunner {

    private final StudentRepository studentRepository;
    private final AcademicRecordRepository recordRepository;

    public DataInitializer(StudentRepository studentRepository,
                           AcademicRecordRepository recordRepository) {
        this.studentRepository = studentRepository;
        this.recordRepository = recordRepository;
    }

    @Override
    public void run(String... args) {

        if (studentRepository.count() > 0) {
            return; // Prevent duplicate data
        }

        Random random = new Random();

        // ===============================
        // ✅ CREATE ADMIN ACCOUNT
        // ===============================
        Student admin = new Student();
        admin.setName("Admin User");
        admin.setEmail("admin@gmail.com");
        admin.setPassword("admin123");
        admin.setDepartment("ADMIN");
        admin.setYear(0);
        admin.setRole("ADMIN");

        studentRepository.save(admin);

        // ===============================
        // ✅ CREATE FACULTY ACCOUNTS
        // ===============================
        String[] departments = {"CSE", "IT", "ECE", "MECH"};

        for (String dept : departments) {
            Student faculty = new Student();
            faculty.setName(dept + " Faculty");
            faculty.setEmail(dept.toLowerCase() + "faculty@gmail.com");
            faculty.setPassword("faculty123");
            faculty.setDepartment(dept);
            faculty.setYear(0);
            faculty.setRole("FACULTY");

            studentRepository.save(faculty);
        }

        // ===============================
        // ✅ STUDENT NAME POOL
        // ===============================
        String[] firstNames = {
                "Arjun", "Rahul", "Kiran", "Vikram", "Sanjay",
                "Amit", "Rohit", "Deepak", "Naveen", "Aditya",
                "Varun", "Manoj", "Siddharth", "Harsha", "Pranav",
                "Akash", "Ravi", "Surya", "Karthik", "Nikhil",
                "Sneha", "Ananya", "Priya", "Divya", "Meera",
                "Pooja", "Neha", "Swathi", "Lakshmi", "Keerthi"
        };

        String[] lastNames = {
                "Sharma", "Reddy", "Kumar", "Verma", "Nair",
                "Iyer", "Patel", "Joshi", "Rao", "Mishra"
        };

        // ===============================
        // ✅ GENERATE 60 STUDENTS PER DEPT
        // ===============================
        for (String dept : departments) {

            for (int i = 1; i <= 60; i++) {

                String firstName = firstNames[random.nextInt(firstNames.length)];
                String lastName = lastNames[random.nextInt(lastNames.length)];
                String fullName = firstName + " " + lastName;

                Student student = new Student();
                student.setName(fullName);
                student.setEmail(firstName.toLowerCase() + i + dept.toLowerCase() + "@gmail.com");
                student.setPassword("123456");
                student.setDepartment(dept);
                student.setYear(3);
                student.setRole("STUDENT");

                Student savedStudent = studentRepository.save(student);

                // ===============================
                // ✅ CREATE ACADEMIC RECORD
                // ===============================
                AcademicRecord record = new AcademicRecord();
                record.setSemester(5);

                double attendance = 50 + random.nextInt(51); // 50–100
                double internalMarks = 30 + random.nextInt(71); // 30–100
                double assignmentMarks = 30 + random.nextInt(71); // 30–100
                double studyHours = 1 + random.nextInt(8); // 1–8
                double previousGpa = 5 + random.nextDouble() * 5; // 5.0–10.0

                record.setAttendance(attendance);
                record.setInternalMarks(internalMarks);
                record.setAssignmentMarks(assignmentMarks);
                record.setStudyHours(studyHours);
                record.setPreviousGpa(previousGpa);
                record.setExtracurricularActivities("Sports");
                record.setStudent(savedStudent);

                recordRepository.save(record);
            }
        }

        System.out.println("✅ Admin + Faculty + 60 Students per Department Generated Successfully!");
    }
}