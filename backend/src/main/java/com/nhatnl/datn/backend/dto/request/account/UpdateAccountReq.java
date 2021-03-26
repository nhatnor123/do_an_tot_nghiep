package com.nhatnl.datn.backend.dto.request.account;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateAccountReq {
    private Long accountId;
//    private String username;
    //    private String password;
//    private String role;
    private String firstName;
    private String lastName;
    private String phoneNo;
//    private String email;
//    private Boolean isApproved;
//    private Boolean isActive;
//    private ZonedDateTime createdAt;
//    private ZonedDateTime updatedAt;
}
