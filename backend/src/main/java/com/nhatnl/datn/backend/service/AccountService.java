package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.dto.entity.AccountDto;
import com.nhatnl.datn.backend.dto.request.account.ChangePasswordReq;
import com.nhatnl.datn.backend.dto.request.account.CreateReq;
import com.nhatnl.datn.backend.dto.request.account.SearchReq;
import com.nhatnl.datn.backend.dto.request.account.UpdateSelfAccountReq;
import com.nhatnl.datn.backend.dto.response.statistic.CommonStatistic;
import com.nhatnl.datn.backend.model.Account;

import java.util.List;

public interface AccountService {
    AccountDto register(CreateReq req);

    AccountDto getSelfAccount();

    AccountDto create(CreateReq req);

    AccountDto updateSelfAccount(UpdateSelfAccountReq request);

    AccountDto getById(Long accountId);

    AccountDto findByUsername(String username);

    List<AccountDto> search(SearchReq req);

    AccountDto lock(Long accountId);

    AccountDto unlock(Long accountId);

    AccountDto changePassword(ChangePasswordReq req);

    CommonStatistic getStatisticByRole(Account.Role role);

}
