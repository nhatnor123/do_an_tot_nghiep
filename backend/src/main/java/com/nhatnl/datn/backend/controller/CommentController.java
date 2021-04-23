package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.dto.request.comment.*;
import com.nhatnl.datn.backend.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/comment")
@Slf4j
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestBody CreateReq request) {
        log.info("create");
        return ResponseEntity.ok(commentService.create(request));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @PostMapping(path = "/update")
    public ResponseEntity<?> update(@RequestBody UpdateReq request) {
        log.info("update");
        return ResponseEntity.ok(commentService.update(request));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @PostMapping(path = "/get-by-id")
    public ResponseEntity<?> getById(@RequestBody GetByIdReq request) {
        log.info("getById");
        return ResponseEntity.ok(commentService.getById(request.getCommentId()));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @PostMapping(path = "/search")
    public ResponseEntity<?> search(@RequestBody SearchReq request) {
        log.info("search");
        return ResponseEntity.ok(commentService.search(request));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @PostMapping(path = "/archive")
    public ResponseEntity<?> archive(@RequestBody ArchiveReq request) {
        log.info("archive");
        return ResponseEntity.ok(commentService.archive(request.getCommentId()));
    }

}
