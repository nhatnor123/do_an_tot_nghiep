package com.nhatnl.datn.backend.dto.request.account;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterNewAccountReq {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNo;
    private String email;
}
