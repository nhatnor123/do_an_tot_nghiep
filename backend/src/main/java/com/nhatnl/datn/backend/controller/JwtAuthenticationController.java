package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.config.jwtConfig.JwtTokenUtil;
import com.nhatnl.datn.backend.constant.Constant;
import com.nhatnl.datn.backend.dto.request.authentication.JwtReq;
import com.nhatnl.datn.backend.dto.request.authentication.CheckJwtReq;
import com.nhatnl.datn.backend.dto.response.authentication.AuthenticateResp;
import com.nhatnl.datn.backend.service.impl.JwtUserDetailsServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/authenticate")
@Slf4j
public class JwtAuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailsServiceImpl jwtUserDetailsService;

    public JwtAuthenticationController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil
            , JwtUserDetailsServiceImpl jwtUserDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    @RequestMapping(value = "/get-token", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtReq authenticationRequest) throws Exception {
        log.info("Authenticate : \n{}", authenticationRequest.toString());

        this.authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        for (GrantedAuthority grantedAuthority : userDetails.getAuthorities()) {
            if (grantedAuthority.getAuthority().equals(Constant.ROLE_PREFIX + authenticationRequest.getRole().name())) {
                final String token = jwtTokenUtil.generateToken(userDetails);
                return ResponseEntity.ok(new AuthenticateResp(token));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED");
    }

    private void authenticate(String username, String password) throws Exception {
        log.info("authenticate");
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLE", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @RequestMapping(value = "check-token", method = RequestMethod.POST)
    public ResponseEntity<?> checkToken(@RequestBody CheckJwtReq request) {
        log.info("checkToken");

        UsernamePasswordAuthenticationToken user
                = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        for (GrantedAuthority grantedAuthority : user.getAuthorities()) {
            if (grantedAuthority.getAuthority().equals(Constant.ROLE_PREFIX + request.getRole().name())) {
                return ResponseEntity.ok(true);
            }
        }
        return ResponseEntity.ok(false);
    }

}
