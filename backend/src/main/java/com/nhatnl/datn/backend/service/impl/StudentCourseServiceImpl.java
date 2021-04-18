package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.dto.request.studentCourse.*;
import com.nhatnl.datn.backend.model.Course;
import com.nhatnl.datn.backend.model.Student;
import com.nhatnl.datn.backend.model.StudentCourse;
import com.nhatnl.datn.backend.repository.StudentCourseRepo;
import com.nhatnl.datn.backend.repository.StudentRepo;
import com.nhatnl.datn.backend.service.AccountService;
import com.nhatnl.datn.backend.service.CourseService;
import com.nhatnl.datn.backend.service.StudentCourseService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentCourseServiceImpl implements StudentCourseService {

    public final AccountService accountService;
    public final CourseService courseService;
    public final StudentCourseRepo studentCourseRepo;
    public final StudentRepo studentRepo;

    public StudentCourseServiceImpl(AccountService accountService, CourseService courseService, StudentCourseRepo studentCourseRepo,
                                    StudentRepo studentRepo) {
        this.accountService = accountService;
        this.courseService = courseService;
        this.studentCourseRepo = studentCourseRepo;
        this.studentRepo = studentRepo;
    }

    @Override
    public StudentCourse create(CreateReq req) {
        Course course = courseService.getById(req.getCourseId());
        Student student = studentRepo.getById(req.getStudentId());

        StudentCourse studentCourse = StudentCourse.builder()
                .student(student)
                .studentId(req.getStudentId())
                .course(course)
                .courseId(req.getCourseId())
                .isApproved(true)
                .isActive(true)
                .build();

        return studentCourseRepo.create(studentCourse);
    }

    @Override
    public StudentCourse update(UpdateReq req) {
        studentCourseRepo.update(req.getStudentId(), req.getCourseId(), req.getIsApproved());
        return this.getById(req.getStudentId(), req.getCourseId());
    }

    @Override
    public StudentCourse getById(Long studentId, Long courseId) {
        return studentCourseRepo.getById(studentId, courseId);
    }

    @Override
    public List<StudentCourse> search(SearchReq req) {
        return studentCourseRepo.search(
                req.getStudentId(),
                req.getCourseId(),
                req.getIsApproved(),
                req.getCreatedAtFrom(),
                req.getCreatedAtTo(),
                req.getUpdatedAtFrom(),
                req.getUpdatedAtTo(),
                req.getFieldList()
        );
    }

    @Override
    public StudentCourse archive(Long studentId, Long courseId) {
        studentCourseRepo.archive(studentId, courseId);
        return this.getById(studentId, courseId);
    }

}
