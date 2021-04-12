package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.dto.request.course.*;
import com.nhatnl.datn.backend.service.CourseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/course")
@Slf4j
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestBody CreateReq request) {
        log.info("create");
        return ResponseEntity.ok(courseService.create(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/update-course-info")
    public ResponseEntity<?> updateCourseInfo(@RequestBody UpdateCourseInfoReq request) {
        log.info("updateSelfAccount");
        return ResponseEntity.ok(courseService.updateCourseInfo(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/get-by-id")
    public ResponseEntity<?> getById(@RequestBody GetByIdReq request) {
        log.info("getById");
        return ResponseEntity.ok(courseService.getById(request.getCourseId()));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/search")
    public ResponseEntity<?> search(@RequestBody SearchReq request) {
        log.info("search");
        return ResponseEntity.ok(courseService.search(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/archive")
    public ResponseEntity<?> archive(@RequestBody ArchiveReq request) {
        log.info("archive");
        return ResponseEntity.ok(courseService.archive(request.getCourseId()));
    }

}
