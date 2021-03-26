package com.nhatnl.datn.backend.dto.request.account;

import com.nhatnl.datn.backend.model.Account;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateAccountReq {
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private Account.Role role;
    private String phoneNo;
    private String address;
    private String imageUrl;
}
