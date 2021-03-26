package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.dto.entity.AccountDto;
import com.nhatnl.datn.backend.dto.request.account.ActiveAccountReq;
import com.nhatnl.datn.backend.dto.request.account.DisableAccountReq;
import com.nhatnl.datn.backend.dto.request.account.RegisterNewAccountReq;
import com.nhatnl.datn.backend.dto.request.account.UpdateAccountReq;
import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@CrossOrigin
@RequestMapping(path = "/account")
@Slf4j
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "/register-admin")
    public ResponseEntity<?> registerAdmin(@RequestBody RegisterNewAccountReq request) {
        log.info("registerAdmin");
        return ResponseEntity.ok(accountService.createNewAccount(request, Account.Role.ADMIN, true));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "/disable")
    public ResponseEntity<?> disableAccount(@RequestBody DisableAccountReq request) {
        log.info("disableAccount");
        accountService.disableAccount(request);
        return ResponseEntity.ok("success");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "/active")
    public ResponseEntity<?> activeAccount(@RequestBody ActiveAccountReq request) {
        log.info("activeAccount");
        accountService.activeAccount(request);
        return ResponseEntity.ok("success");
    }

    @GetMapping(path = "/get-all-list-account")
    public ResponseEntity<?> getAllListAccount() {
        log.info("getAllListAccount");
        return ResponseEntity.ok(accountService.getAllListAccount());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(path = "/get-list-account-admin")
    public ResponseEntity<?> getListAccountAdmin() {
        log.info("getListAccountAdmin");
        return ResponseEntity.ok(accountService.getListAccountAdmin());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(path = "/get-list-account-editor")
    public ResponseEntity<?> getListAccountEditor() {
        log.info("getListAccountEditor");
        return ResponseEntity.ok(accountService.getListAccountEditor());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(path = "/get-list-account-collaborator")
    public ResponseEntity<?> getListAccountCollaborator() {
        log.info("getListAccountCollaborator");
        return ResponseEntity.ok(accountService.getListAccountCollaborator());
    }

    @PostMapping(path = "/update")
    public ResponseEntity<?> updateAccount(@RequestBody UpdateAccountReq request) {
        log.info("updateAccount");
        return ResponseEntity.ok(accountService.update(request));
    }

    @GetMapping(path = "/get-self-account")
    public ResponseEntity<?> getSelfAccount() {
        log.info("getSelfAccount");

        UsernamePasswordAuthenticationToken user
                = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        AccountDto accountDto = accountService.findByUsername(((User) user.getPrincipal()).getUsername());

        return ResponseEntity.ok(Collections.singletonList(accountDto));
    }

}
