package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.dto.request.complaint.*;
import com.nhatnl.datn.backend.service.ComplaintService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/complaint")
@Slf4j
public class ComplaintController {
    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestBody CreateReq request) {
        log.info("create");
        return ResponseEntity.ok(complaintService.create(request));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('ADMIN')")
    @PostMapping(path = "/update")
    public ResponseEntity<?> update(@RequestBody UpdateReq request) {
        log.info("update");
        return ResponseEntity.ok(complaintService.update(request));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')" + "|| hasRole('ADMIN')")
    @PostMapping(path = "/get-by-id")
    public ResponseEntity<?> getById(@RequestBody GetByIdReq request) {
        log.info("getById");
        return ResponseEntity.ok(complaintService.getById(request.getComplaintId()));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')" + "|| hasRole('ADMIN')")
    @PostMapping(path = "/search")
    public ResponseEntity<?> search(@RequestBody SearchReq request) {
        log.info("search");
        return ResponseEntity.ok(complaintService.search(request));
    }

    @PreAuthorize("hasRole('TEACHER')" + "|| hasRole('STUDENT')" + "|| hasRole('ADMIN')")
    @PostMapping(path = "/archive")
    public ResponseEntity<?> archive(@RequestBody ArchiveReq request) {
        log.info("archive");
        return ResponseEntity.ok(complaintService.archive(request.getComplaintId()));
    }

}
