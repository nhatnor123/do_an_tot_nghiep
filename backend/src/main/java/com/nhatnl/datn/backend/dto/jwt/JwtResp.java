package com.nhatnl.datn.backend.dto.jwt;

public class JwtResp {
    private final String jwtToken;

    public JwtResp(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getToke() {
        return this.jwtToken;
    }
}
