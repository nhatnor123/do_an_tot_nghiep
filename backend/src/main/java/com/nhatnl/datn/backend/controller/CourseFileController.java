package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.dto.request.courseFile.*;
import com.nhatnl.datn.backend.service.CourseFileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@CrossOrigin
@RequestMapping(path = "/course-file")
@Slf4j
public class CourseFileController {
    private final CourseFileService courseFileService;

    public CourseFileController(CourseFileService courseFileService) {
        this.courseFileService = courseFileService;
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestBody CreateReq request) throws ParseException {
        log.info("create");
        return ResponseEntity.ok(courseFileService.create(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/update")
    public ResponseEntity<?> update(@RequestBody UpdateReq request) throws ParseException {
        log.info("update");
        return ResponseEntity.ok(courseFileService.update(request));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @PostMapping(path = "/get-by-id")
    public ResponseEntity<?> getById(@RequestBody GetByIdReq request) {
        log.info("getById");
        return ResponseEntity.ok(courseFileService.getById(request.getCourseFileId()));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @PostMapping(path = "/search")
    public ResponseEntity<?> search(@RequestBody SearchReq request) {
        log.info("search");
        return ResponseEntity.ok(courseFileService.search(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/archive")
    public ResponseEntity<?> archive(@RequestBody ArchiveReq request) {
        log.info("archive");
        return ResponseEntity.ok(courseFileService.archive(request.getCourseFileId()));
    }

}
