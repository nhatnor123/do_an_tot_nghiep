package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.model.Account;

import java.util.Date;
import java.util.List;

public interface AccountRepo {
    Account create(Account account);

    Account update(Account account);

    void updateAccountInfo(String username, String firstName, String lastName, String phoneNo, String address,
                           String imageUrl, Date birthday, List<String> fieldList);

    Account getById(Long accountId);

    Account findByUsername(String username);

    List<Account> search(Long accountId, String username, String email, String firstName, String lastName,
                         Account.Role role, String phoneNo, String address, Date birthdayFrom, Date birthdayTo,
                         Boolean isActive, Date createdAtFrom, Date createdAtTo, Date updatedAtFrom,
                         Date updatedAtTo, List<String> fieldList);

    void lockAccount(Long accountId);

    void unlockAccount(Long accountId);

    Account changePassword(String username, String newPassword);

}
