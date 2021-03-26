package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.dto.entity.AccountDto;
import com.nhatnl.datn.backend.dto.request.account.ActiveAccountReq;
import com.nhatnl.datn.backend.dto.request.account.DisableAccountReq;
import com.nhatnl.datn.backend.dto.request.account.RegisterNewAccountReq;
import com.nhatnl.datn.backend.dto.request.account.UpdateAccountReq;
import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.repository.AccountRepo;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountService {
    private final AccountRepo accountRepo;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public AccountService(AccountRepo accountRepo, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.accountRepo = accountRepo;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public List<AccountDto> getAllListAccount() {
        List<Account> accountList = this.accountRepo.getAllListAccount();

        List<AccountDto> accountDtoList = new ArrayList<>();
        for (Account account : accountList) {
            accountDtoList.add(modelMapper.map(account, AccountDto.class));
        }

        return accountDtoList;
    }

    public List<AccountDto> getListAccountAdmin() {
        List<Account> accountList = this.accountRepo.getListAccountActiveByRole("ADMIN");

        List<AccountDto> accountDtoList = new ArrayList<>();
        for (Account account : accountList) {
            accountDtoList.add(modelMapper.map(account, AccountDto.class));
        }

        return accountDtoList;
    }

    public List<AccountDto> getListAccountEditor() {
        List<Account> accountList = this.accountRepo.getListAccountActiveByRole("EDITOR");

        List<AccountDto> accountDtoList = new ArrayList<>();
        for (Account account : accountList) {
            accountDtoList.add(modelMapper.map(account, AccountDto.class));
        }

        return accountDtoList;
    }

    public List<AccountDto> getListAccountCollaborator() {
        List<Account> accountList = this.accountRepo.getListAccountActiveByRole("COLLABORATOR");

        List<AccountDto> accountDtoList = new ArrayList<>();
        for (Account account : accountList) {
            accountDtoList.add(modelMapper.map(account, AccountDto.class));
        }

        return accountDtoList;
    }

    public AccountDto createNewAccount(RegisterNewAccountReq request, Account.Role role, Boolean isApproved) {
        Account account = Account.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNo(request.getPhoneNo())
                .email(request.getEmail())
                .isActive(true)

                .build();

        account = this.accountRepo.create(account);

        return modelMapper.map(account, AccountDto.class);
    }

    public AccountDto update(UpdateAccountReq request) {
        Account account = (this.accountRepo.getById(request.getAccountId().toString())).get(0);

        account.setFirstName(request.getFirstName());
        account.setLastName(request.getLastName());
        account.setPhoneNo(request.getPhoneNo());

        account = accountRepo.update(account);

        return modelMapper.map(account, AccountDto.class);
    }

    public void disableAccount(DisableAccountReq request) {
        this.accountRepo.disableAccount(request.getAccountId());
    }

    public void activeAccount(ActiveAccountReq request) {
        this.accountRepo.activeAccount(request.getAccountId());
    }

    public AccountDto findByUsername(String username) {
        Account account = this.accountRepo.findByUsername(username);

        return modelMapper.map(account, AccountDto.class);
    }
}
