package com.nhatnl.datn.backend.dto.request.account;

import com.nhatnl.datn.backend.model.Account;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchReq {
    private Long accountId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Account.Role role;
    private String phoneNo;
    private String address;
    private Date birthdayFrom;
    private Date birthdayTo;
    private Boolean isActive;
    private Date createdAtFrom;
    private Date createdAtTo;
    private Date updatedAtFrom;
    private Date updatedAtTo;
    private List<String> fieldList;
}
