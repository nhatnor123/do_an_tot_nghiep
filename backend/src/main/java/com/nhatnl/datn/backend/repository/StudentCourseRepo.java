package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.model.StudentCourse;

import java.util.Date;
import java.util.List;

public interface StudentCourseRepo {
    StudentCourse create(StudentCourse studentCourse);

    StudentCourse update(StudentCourse studentCourse);

    StudentCourse getById(Long studentId, Long courseId);

    void update(Long studentId, Long courseId, Boolean isApproved);

    List<StudentCourse> search(Long studentId, Long courseId, Boolean isApproved, Date createdAtFrom,
                               Date createdAtTo, Date updatedAtFrom, Date updatedAtTo, List<String> fieldList);

    void archive(Long studentId, Long courseId);

    void recover(Long studentId, Long courseId);
}
