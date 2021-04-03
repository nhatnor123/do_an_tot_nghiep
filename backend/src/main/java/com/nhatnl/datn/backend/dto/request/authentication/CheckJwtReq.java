package com.nhatnl.datn.backend.dto.request.authentication;

import com.nhatnl.datn.backend.model.Account;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CheckJwtReq {
    private Account.Role role;
}
