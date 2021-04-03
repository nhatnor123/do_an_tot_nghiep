package com.nhatnl.datn.backend.dto.response.authentication;

public class JwtResp {
    private final String jwtToken;

    public JwtResp(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getToke() {
        return this.jwtToken;
    }
}
