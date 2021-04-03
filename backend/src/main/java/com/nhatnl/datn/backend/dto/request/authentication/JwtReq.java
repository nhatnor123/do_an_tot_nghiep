package com.nhatnl.datn.backend.dto.request.authentication;

import com.nhatnl.datn.backend.model.Account;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtReq {
    private String username;
    private String password;
    private Account.Role role;

    @Override
    public String toString() {
        return this.username + " : " + this.password;
    }
}
