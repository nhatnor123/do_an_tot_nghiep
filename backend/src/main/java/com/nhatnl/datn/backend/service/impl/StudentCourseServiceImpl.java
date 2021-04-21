package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.dto.request.studentCourse.*;
import com.nhatnl.datn.backend.dto.response.studentCourse.GetStudentsJoiningCourseResp;
import com.nhatnl.datn.backend.dto.response.studentCourse.GetStudentsNotJoinCourseResp;
import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.model.Course;
import com.nhatnl.datn.backend.model.Student;
import com.nhatnl.datn.backend.model.StudentCourse;
import com.nhatnl.datn.backend.repository.StudentCourseRepo;
import com.nhatnl.datn.backend.repository.StudentRepo;
import com.nhatnl.datn.backend.service.AccountService;
import com.nhatnl.datn.backend.service.CourseService;
import com.nhatnl.datn.backend.service.StudentCourseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.*;

@Service
@Slf4j
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
    public List<StudentCourse> create(CreateReq req) {
        List<Student> studentList = studentRepo.search(req.getStudentIds(), null, null, null, null,
                null, null, null, Collections.singletonList("studentId"));

        List<StudentCourse> studentCourseList = new ArrayList<>();
        for (Student student : studentList) {
            StudentCourse studentCourse = StudentCourse.builder()
                    .studentId(student.getStudentId())
                    .courseId(req.getCourseId())
                    .isApproved(true)
                    .isActive(true)
                    .createdAt(new Date())
                    .build();
            studentCourse = studentCourseRepo.update(studentCourse);

            studentCourseList.add(studentCourse);
        }

        return studentCourseList;
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

    @Override
    public GetStudentsNotJoinCourseResp getStudentsNotJoinCourse(Long courseId) {
        List<Account> accountList = studentRepo.getStudentsNotJoinCourse(courseId);
        List<GetStudentsNotJoinCourseResp.StudentInfoDto> studentInfoDtoList = new ArrayList<>();
        for (Account account : accountList) {
            Student student = account.getStudent();
            studentInfoDtoList.add(
                    GetStudentsNotJoinCourseResp.StudentInfoDto.builder()
                            .studentId(student.getStudentId())
                            .username(account.getUsername())
                            .email(account.getEmail())
                            .firstName(account.getFirstName())
                            .lastName(account.getLastName())
                            .displayName(student.getDisplayName())
                            .build()
            );
        }

        return GetStudentsNotJoinCourseResp.builder()
                .students(studentInfoDtoList)
                .build();
    }

    @Override
    public GetStudentsJoiningCourseResp getStudentsJoiningCourse(Long courseId) {
        List<StudentCourse> studentCourseList = this.search(
                SearchReq.builder()
                        .courseId(courseId)
                        .fieldList(Collections.singletonList("courseId"))
                        .build()
        );
        List<GetStudentsJoiningCourseResp.StudentJoiningCourseInfoDto> students = new ArrayList<>();

        for (StudentCourse studentCourse : studentCourseList) {
            Account account = studentCourse.getStudent().getAccount();
            students.add(
                    GetStudentsJoiningCourseResp.StudentJoiningCourseInfoDto.builder()
                            .studentId(studentCourse.getStudentId())
                            .username(account.getUsername())
                            .email(account.getEmail())
                            .displayName(studentCourse.getStudent().getDisplayName())
                            .firstName(account.getFirstName())
                            .lastName(account.getLastName())
                            .isApproved(studentCourse.getIsApproved())
                            .createdAt(studentCourse.getCreatedAt())
                            .updatedAt(studentCourse.getUpdatedAt())
                            .build()
            );
        }

        return GetStudentsJoiningCourseResp.builder()
                .students(students)
                .build();
    }


}
