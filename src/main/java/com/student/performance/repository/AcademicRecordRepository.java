package com.student.performance.repository;

import com.student.performance.model.AcademicRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AcademicRecordRepository
        extends JpaRepository<AcademicRecord, Long> {

    List<AcademicRecord> findByStudentId(Long studentId);

    AcademicRecord findTopByStudent_IdOrderByIdDesc(Long studentId);
}