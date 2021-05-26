package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.dto.entity.AccountDto;
import com.nhatnl.datn.backend.dto.request.account.*;
import com.nhatnl.datn.backend.dto.response.statistic.CommonStatistic;
import com.nhatnl.datn.backend.dto.response.statistic.GetDateTimeAndQuantityResp;
import com.nhatnl.datn.backend.dto.response.statistic.GetTotalNumberResp;
import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.model.Student;
import com.nhatnl.datn.backend.model.Teacher;
import com.nhatnl.datn.backend.repository.AccountRepo;
import com.nhatnl.datn.backend.repository.StudentRepo;
import com.nhatnl.datn.backend.repository.TeacherRepo;
import com.nhatnl.datn.backend.service.AccountService;
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
public class AccountServiceImpl implements AccountService {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final AccountRepo accountRepo;
    private final TeacherRepo teacherRepo;
    private final StudentRepo studentRepo;

    public AccountServiceImpl(PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                              AccountRepo accountRepo, TeacherRepo teacherRepo, StudentRepo studentRepo) {
        this.accountRepo = accountRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.teacherRepo = teacherRepo;
        this.studentRepo = studentRepo;
    }

    @Override
    public AccountDto register(CreateReq req) {
        if (req.getRole() == Account.Role.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Dont have permission to register Admin Account");
        }

        return this.create(req);
    }

    @Override
    public AccountDto getSelfAccount() {
        User currentUser = getCurrentUser();
        return this.findByUsername(currentUser.getUsername());
    }

    @Override
    public AccountDto create(CreateReq req) {
        Account account = accountRepo.create(
                Account.builder()
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
                        .build()
        );

        if (account.getRole() == Account.Role.TEACHER) {
            teacherRepo.create(
                    Teacher.builder()
                            .accountId(account.getAccountId())
                            .displayName("")
                            .description("")
                            .isPublic(false)
                            .isActive(true)
                            .build()
            );
        } else if (account.getRole() == Account.Role.STUDENT) {
            studentRepo.create(
                    Student.builder()
                            .accountId(account.getAccountId())
                            .displayName("")
                            .description("")
                            .isActive(true)
                            .build()
            );
        }

        return Mapper.accountFromModelToDto(account);
    }

    @Override
    public AccountDto updateSelfAccount(UpdateSelfAccountReq request) {
        AccountDto accountDto = this.getSelfAccount();

        accountRepo.updateAccountInfo(
                accountDto.getAccountId(),
                request.getFirstName(),
                request.getLastName(),
                request.getPhoneNo(),
                request.getAddress(),
                request.getImageUrl(),
                request.getBirthday(),
                request.getFieldList()
        );

        if (request.getOtherInfo() == null) {
            return getSelfAccount();
        }

        if (accountDto.getRole() == Account.Role.TEACHER) {
            teacherRepo.updateTeacherInfo(
                    accountDto.getAccountId(),
                    request.getOtherInfo().getDisplayName(),
                    request.getOtherInfo().getDescription(),
                    request.getOtherInfo().getIsPublic(),
                    request.getFieldList()
            );
        } else if (accountDto.getRole() == Account.Role.STUDENT) {
            studentRepo.update(
                    accountDto.getAccountId(),
                    request.getOtherInfo().getDisplayName(),
                    request.getOtherInfo().getDescription(),
                    request.getFieldList()
            );
        }


        return this.getSelfAccount();
    }

    @Override
    public AccountDto getById(Long accountId) {
        Account account = accountRepo.getById(accountId);
        return Mapper.accountFromModelToDto(account);
    }

    @Override
    public AccountDto findByUsername(String username) {
        Account account = accountRepo.findByUsername(username);
        return Mapper.accountFromModelToDto(account);
    }

    @Override
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

    @Override
    public AccountDto lock(Long accountId) {
        this.accountRepo.lockAccount(accountId);
        return this.getById(accountId);
    }

    @Override
    public AccountDto unlock(Long accountId) {
        this.accountRepo.unlockAccount(accountId);
        return this.getById(accountId);
    }

    @Override
    public AccountDto changePassword(ChangePasswordReq req) {
        User currentUser = getCurrentUser();
        String username = currentUser.getUsername();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, req.getOldPassword()));
        Account account = accountRepo.changePassword(
                currentUser.getUsername(),
                passwordEncoder.encode(req.getNewPassword())
        );
        return Mapper.accountFromModelToDto(account);
    }

    @Override
    public CommonStatistic getStatisticByRole(Account.Role role) {
        GetTotalNumberResp totalAdmin = accountRepo.getTotalActive(role.name());
        List<GetDateTimeAndQuantityResp> detailStatistic = accountRepo.getDetailStatistic(role.name());

        return CommonStatistic.builder()
                .total(totalAdmin.getQuantity())
                .detail(detailStatistic)
                .build();
    }

    private User getCurrentUser() {
        UsernamePasswordAuthenticationToken user
                = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        return (User) user.getPrincipal();
    }
}
