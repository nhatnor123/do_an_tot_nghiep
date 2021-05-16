package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.dto.request.studentTest.*;
import com.nhatnl.datn.backend.service.StudentTestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@CrossOrigin
@RequestMapping(path = "/student-test")
@Slf4j
public class StudentTestController {
    private final StudentTestService studentTestService;

    public StudentTestController(StudentTestService studentTestService) {
        this.studentTestService = studentTestService;
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestBody CreateReq request) throws ParseException {
        log.info("create");
        return ResponseEntity.ok(studentTestService.create(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/update")
    public ResponseEntity<?> update(@RequestBody UpdateReq request) throws ParseException {
        log.info("update");
        return ResponseEntity.ok(studentTestService.update(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/get-by-id")
    public ResponseEntity<?> getById(@RequestBody GetByIdReq request) {
        log.info("getById");
        return ResponseEntity.ok(studentTestService.getById(request.getStudentId(), request.getTestId()));
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping(path = "/get-of-student-by-id")
    public ResponseEntity<?> getOfStudentById(@RequestBody GetOfStudentByIdReq request) {
        log.info("getById");
        return ResponseEntity.ok(studentTestService.getOfStudentById(request.getTestId()));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @PostMapping(path = "/search")
    public ResponseEntity<?> search(@RequestBody SearchReq request) {
        log.info("search");
        return ResponseEntity.ok(studentTestService.search(request));
    }

}
