package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.dto.request.lesson.*;
import com.nhatnl.datn.backend.service.LessonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/lesson")
@Slf4j
public class LessonController {
    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestBody CreateReq request) {
        log.info("create");
        return ResponseEntity.ok(lessonService.create(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/update")
    public ResponseEntity<?> update(@RequestBody UpdateLessonReq request) {
        log.info("update");
        return ResponseEntity.ok(lessonService.updateLesson(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/get-by-id")
    public ResponseEntity<?> getById(@RequestBody GetByIdReq request) {
        log.info("getById");
        return ResponseEntity.ok(lessonService.getById(request.getLessonId()));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/search")
    public ResponseEntity<?> search(@RequestBody SearchReq request) {
        log.info("search");
        return ResponseEntity.ok(lessonService.search(request));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping(path = "/archive")
    public ResponseEntity<?> archive(@RequestBody ArchiveReq request) {
        log.info("archive");
        return ResponseEntity.ok(lessonService.archive(request.getLessonId()));
    }

}
