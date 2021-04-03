package com.nhatnl.datn.backend.dto.entity;

import com.nhatnl.datn.backend.model.Account;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountDto {
    private Long accountId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Account.Role role;
    private String phoneNo;
    private String address;
    private String imageUrl;
    private Date birthday;
    private Boolean isActive;
    private Date createdAt;
    private Date updatedAt;
}
