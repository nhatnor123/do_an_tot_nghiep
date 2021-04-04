package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.dto.entity.AccountDto;
import com.nhatnl.datn.backend.dto.request.account.*;
import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.repository.AccountRepo;
import com.nhatnl.datn.backend.util.Mapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AccountService {
    private final AccountRepo accountRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AccountService(AccountRepo accountRepo, PasswordEncoder passwordEncoder,
                          AuthenticationManager authenticationManager) {
        this.accountRepo = accountRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public AccountDto register(CreateReq req) {
        if (req.getRole() == Account.Role.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Dont have permission to register Admin Account");
        }

        return this.create(req);
    }

    public AccountDto getSelfAccount() {
        User currentUser = getCurrentUser();
        return this.findByUsername(currentUser.getUsername());
    }

    public AccountDto create(CreateReq req) {
        Account account = Account.builder()
                .username(req.getUsername())
                .password(passwordEncoder.encode(req.getPassword()))
                .email(req.getEmail())
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .role(req.getRole())
                .phoneNo(req.getPhoneNo())
                .address(req.getAddress())
                .imageUrl(req.getImageUrl())
                .birthday(req.getBirthday())
                .isActive(true)
                .build();

        account = accountRepo.create(account);
        return Mapper.accountFromModelToDto(account);
    }

    public AccountDto updateSelfAccount(UpdateSelfAccountReq request) {
        User currentUser = getCurrentUser();

        accountRepo.updateInfoAccount(
                currentUser.getUsername(),
                request.getFirstName(),
                request.getLastName(),
                request.getPhoneNo(),
                request.getAddress(),
                request.getImageUrl(),
                request.getBirthday(),
                request.getFieldList()
        );

        return getSelfAccount();
    }

    public AccountDto getById(Long accountId) {
        Account account = accountRepo.getById(accountId);
        return Mapper.accountFromModelToDto(account);
    }

    public AccountDto findByUsername(String username) {
        Account account = accountRepo.findByUsername(username);
        return Mapper.accountFromModelToDto(account);
    }

    public List<AccountDto> search(SearchReq req) {
        List<Account> accountList = accountRepo.search(
                req.getAccountId(),
                req.getUsername(),
                req.getEmail(),
                req.getFirstName(),
                req.getLastName(),
                req.getRole(),
                req.getPhoneNo(),
                req.getAddress(),
                req.getBirthdayFrom(),
                req.getBirthdayTo(),
                req.getIsActive(),
                req.getCreatedAtFrom(),
                req.getCreatedAtTo(),
                req.getUpdatedAtFrom(),
                req.getUpdatedAtTo(),
                req.getFieldList()
        );

        return Mapper.accountListFromModelToDto(accountList);
    }

    public AccountDto lock(Long accountId) {
        this.accountRepo.lockAccount(accountId);
        return this.getById(accountId);
    }

    public AccountDto unlock(Long accountId) {
        this.accountRepo.unlockAccount(accountId);
        return this.getById(accountId);
    }

    public AccountDto changePassword(ChangePasswordReq req) throws Exception {
        User currentUser = getCurrentUser();
        String username = currentUser.getUsername();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, req.getOldPassword()));
        Account account = accountRepo.changePassword(
                currentUser.getUsername(),
                passwordEncoder.encode(req.getNewPassword())
        );
        if (account == null) {
            throw new Exception("Password wrong or account is inactive");
        }
        return Mapper.accountFromModelToDto(account);
    }

    private User getCurrentUser() {
        UsernamePasswordAuthenticationToken user
                = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        return (User) user.getPrincipal();
    }
}
