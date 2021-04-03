package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.dto.request.account.*;
import com.nhatnl.datn.backend.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/account")
@Slf4j
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody CreateReq request) {
        log.info("register");
        return ResponseEntity.ok(accountService.register(request));
    }

    @PreAuthorize("hasRole('ADMIN')" + "|| hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @GetMapping(path = "/get-self-account")
    public ResponseEntity<?> getSelfAccount() {
        log.info("getSelfAccount");
        return ResponseEntity.ok(accountService.getSelfAccount());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestBody CreateReq request) {
        log.info("create");
        return ResponseEntity.ok(accountService.create(request));
    }

    @PreAuthorize("hasRole('ADMIN')" + "|| hasRole('TEACHER')" + "|| hasRole('STUDENT')")
    @PostMapping(path = "/update-self-account")
    public ResponseEntity<?> updateSelfAccount(@RequestBody UpdateSelfAccountReq request) {
        log.info("updateSelfAccount");
        return ResponseEntity.ok(accountService.updateSelfAccount(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "/get-by-id")
    public ResponseEntity<?> getById(@RequestBody GetById request) {
        log.info("getById");
        return ResponseEntity.ok(accountService.getById(request.getAccountId()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "/search")
    public ResponseEntity<?> search(@RequestBody SearchReq request) {
        log.info("search");
        return ResponseEntity.ok(accountService.search(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "/lock")
    public ResponseEntity<?> lock(@RequestBody LockReq request) {
        log.info("lock");
        return ResponseEntity.ok(accountService.lock(request.getAccountId()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "/unlock")
    public ResponseEntity<?> unlock(@RequestBody UnlockReq request) {
        log.info("unlock");
        return ResponseEntity.ok(accountService.unlock(request.getAccountId()));
    }
}
