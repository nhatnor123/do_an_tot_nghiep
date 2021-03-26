package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.constant.Constant;
import com.nhatnl.datn.backend.dto.request.account.CreateAccountReq;
import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.repository.AccountRepo;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    private final AccountRepo accountRepo;
    private final PasswordEncoder passwordEncoder;

    public JwtUserDetailsService(AccountRepo accountRepo) {
        this.accountRepo = accountRepo;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepo.findByUsername(username);

        if (account != null) {
            return new User(account.getUsername(), account.getPassword(), this.getAuthority(account));
        } else {
            throw new UsernameNotFoundException("username not found with username = " + username);
        }
    }

    private List<GrantedAuthority> getAuthority(Account account) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(Constant.ROLE_PREFIX + account.getRole()));
        return authorities;
    }

    public Account createAccount(CreateAccountReq req) {
        Account account = Account.builder()
                .username(req.getUsername())
                .password(passwordEncoder.encode(req.getPassword()))
                .email(req.getEmail())
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .role(req.getRole())
                .phoneNo(req.getPhoneNo())
                .address(req.getAddress())
                .imageUrl(req.getImageUrl())
                .birthday(new Date())
                .isActive(true)
                .build();

        return this.accountRepo.create(account);
    }
}
