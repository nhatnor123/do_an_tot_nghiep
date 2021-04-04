package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.constant.Constant;
import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.repository.AccountRepo;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService {
    private final AccountRepo accountRepo;

    public JwtUserDetailsServiceImpl(AccountRepo accountRepo) {
        this.accountRepo = accountRepo;
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

}
