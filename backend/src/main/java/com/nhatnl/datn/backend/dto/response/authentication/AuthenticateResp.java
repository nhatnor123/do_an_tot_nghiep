package com.nhatnl.datn.backend.dto.response.authentication;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticateResp {
    private String token;
}
