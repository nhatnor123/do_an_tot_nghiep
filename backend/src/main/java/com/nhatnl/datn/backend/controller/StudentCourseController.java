package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.dto.request.studentCourse.*;
import com.nhatnl.datn.backend.service.StudentCourseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/student-course")
@Slf4j
public class StudentCourseController {
    private final StudentCourseService studentCourseService;

    public StudentCourseController(StudentCourseService studentCourseService) {
        this.studentCourseService = studentCourseService;
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestBody CreateReq request) {
        log.info("create");
        return ResponseEntity.ok(studentCourseService.create(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/update")
    public ResponseEntity<?> update(@RequestBody UpdateReq request) {
        log.info("update");
        return ResponseEntity.ok(studentCourseService.update(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/get-by-id")
    public ResponseEntity<?> getById(@RequestBody GetByIdReq request) {
        log.info("getById");
        return ResponseEntity.ok(studentCourseService.getById(request.getStudentId(), request.getCourseId()));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/search")
    public ResponseEntity<?> search(@RequestBody SearchReq request) {
        log.info("search");
        return ResponseEntity.ok(studentCourseService.search(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/archive")
    public ResponseEntity<?> archive(@RequestBody ArchiveReq request) {
        log.info("archive");
        return ResponseEntity.ok(studentCourseService.archive(request.getStudentId(), request.getCourseId()));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/get-students-not-join-course")
    public ResponseEntity<?> getStudentsNotJoinCourse(@RequestBody GetStudentsNotJoinCourseReq request) {
        log.info("getStudentsNotJoinCourse");
        return ResponseEntity.ok(studentCourseService.getStudentsNotJoinCourse(request.getCourseId()));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/get-students-joining-course")
    public ResponseEntity<?> getStudentsJoiningCourse(@RequestBody GetStudentsJoiningCourseReq request) {
        log.info("getStudentsJoiningCourse");
        return ResponseEntity.ok(studentCourseService.getStudentsJoiningCourse(request.getCourseId()));
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping(path = "/leave-course")
    public ResponseEntity<?> leaveCourse(@RequestBody LeaveCourseReq request) {
        log.info("getStudentsJoiningCourse");
        return ResponseEntity.ok(studentCourseService.leaveCourse(request.getCourseId()));
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping(path = "/request-join-course")
    public ResponseEntity<?> requestToJoinCourse(@RequestBody RequestToJoinCourseReq request) {
        log.info("requestToJoinCourse");
        return ResponseEntity.ok(studentCourseService.requestToJoinCourse(request.getCourseId(), request.getCode()));
    }


    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping(path = "/cancel-request-join-course")
    public ResponseEntity<?> cancelRequestToJoinCourse(@RequestBody CancelRequestToJoinCourseReq request) {
        log.info("cancelRequestToJoinCourse");
        return ResponseEntity.ok(studentCourseService.cancelRequestToJoinCourse(request.getCourseId()));
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping(path = "/check-if-joining")
    public ResponseEntity<?> checkIfJoiningCourse(@RequestBody CheckIfJoiningCourseReq request) {
        log.info("cancelRequestToJoinCourse");
        return ResponseEntity.ok(studentCourseService.checkIfJoiningCourse(request.getCourseId()));
    }


}
