package com.nhatnl.datn.backend.dto.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticateResp {
    private String token;
}
