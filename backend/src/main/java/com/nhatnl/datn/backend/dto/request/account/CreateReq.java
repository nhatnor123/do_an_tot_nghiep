package com.nhatnl.datn.backend.dto.request.account;

import com.nhatnl.datn.backend.model.Account;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateReq {
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private Account.Role role;
    private String phoneNo;
    private String address;
    private String imageUrl;
    private Date birthday;
}
