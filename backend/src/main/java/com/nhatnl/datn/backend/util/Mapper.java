package com.nhatnl.datn.backend.util;

import com.nhatnl.datn.backend.dto.entity.AccountDto;
import com.nhatnl.datn.backend.model.Account;

import java.util.ArrayList;
import java.util.List;

public class Mapper {
    public static AccountDto accountFromModelToDto(Account account) {
        if (account == null) {
            return null;
        }
        return AccountDto.builder()
                .accountId(account.getAccountId())
                .username(account.getUsername())
                .email(account.getEmail())
                .firstName(account.getFirstName())
                .lastName(account.getLastName())
                .role(account.getRole())
                .phoneNo(account.getPhoneNo())
                .address(account.getAddress())
                .imageUrl(account.getImageUrl())
                .birthday(account.getBirthday())
                .isActive(account.getIsActive())
                .createdAt(account.getCreatedAt())
                .updatedAt(account.getUpdatedAt())
                .student(account.getStudent())
                .teacher(account.getTeacher())
                .build();
    }

    public static List<AccountDto> accountListFromModelToDto(List<Account> accountList) {
        List<AccountDto> accountDtoList = new ArrayList<>();
        for (Account account : accountList) {
            accountDtoList.add(accountFromModelToDto(account));
        }
        return accountDtoList;
    }
}
