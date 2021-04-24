package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.service.TeacherService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/teacher")
@Slf4j
public class TeacherController {
    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping(path = "/discover-teachers")
    public ResponseEntity<?> discoverTeachers() {
        log.info("discover-teachers");
        return ResponseEntity.ok(teacherService.discoverTeachers());
    }


}
