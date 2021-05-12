package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.dto.request.test.*;
import com.nhatnl.datn.backend.model.Test;
import com.nhatnl.datn.backend.service.TestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@CrossOrigin
@RequestMapping(path = "/test")
@Slf4j
public class TestController {
    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestBody CreateReq request) throws ParseException {
        log.info("create");
        return ResponseEntity.ok(testService.create(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/update")
    public ResponseEntity<?> update(@RequestBody UpdateReq request) {
        log.info("update");
        return ResponseEntity.ok(testService.update(request));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @PostMapping(path = "/get-by-id")
    public ResponseEntity<?> getById(@RequestBody GetByIdReq request) {
        log.info("getById");
        return ResponseEntity.ok(testService.getById(request.getTestId()));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @PostMapping(path = "/search")
    public ResponseEntity<?> search(@RequestBody SearchReq request) {
        log.info("search");
        return ResponseEntity.ok(testService.search(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/archive")
    public ResponseEntity<?> archive(@RequestBody ArchiveReq request) {
        log.info("archive");
        return ResponseEntity.ok(testService.archive(request.getTestId()));
    }

}
