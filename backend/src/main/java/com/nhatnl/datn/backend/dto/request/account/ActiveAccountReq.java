package com.nhatnl.datn.backend.dto.request.account;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ActiveAccountReq {
    private String accountId;
}
