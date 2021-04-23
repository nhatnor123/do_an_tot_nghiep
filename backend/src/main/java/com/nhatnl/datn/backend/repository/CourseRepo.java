package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.model.Course;
import com.nhatnl.datn.backend.model.Student;

import java.util.Date;
import java.util.List;

public interface CourseRepo {
    Course create(Course course);

    Course update(Course course);

    void updateCourseInfo(Long courseId, Long teacherId, String name, String description, String imageUrl, String code,
                          Boolean isPublic, List<String> fieldList);

    Course getById(Long courseId);

    Course getByIdAndTeacherId(Long courseId, Long teacherId);

    List<Course> search(Long courseId, Long teacherId, String name, String description, Boolean isPublic,
                        Date createdAtFrom, Date createdAtTo, Date updatedAtFrom,
                        Date updatedAtTo, List<String> fieldList);

    void archive(Long courseId, Long teacherId);

    void recover(Long courseId, Long teacherId);

    List<Course> getCoursesStudentJoining(Long studentId);

    List<Course> getCoursesStudentCanJoin(Long studentId);

}
