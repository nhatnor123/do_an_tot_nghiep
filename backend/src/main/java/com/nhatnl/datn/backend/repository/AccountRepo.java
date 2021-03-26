package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.model.Account;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;

@Repository
public class AccountRepo {
    @PersistenceContext
    private EntityManager entityManager;

    public List<Account> getAllListAccount() {
        String queryString = "select * from Account";
        Query query = entityManager.createNativeQuery(queryString, Account.class);
        return query.getResultList();
    }

    public List<Account> getById(String accountId) {
        String queryString = "select * from Account where accountId = :accountId";
        Query query = entityManager.createNativeQuery(queryString, Account.class);
        query.setParameter("accountId", accountId);
        return query.getResultList();
    }

    public List<Account> getListAccountActiveByRole(String role) {
        String queryString = "select * from Account where role = '" + role + "' and isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Account.class);
        return query.getResultList();
    }

    public Account findByUsername(String username) {
        String queryString = "select * from Account where username = :username and isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Account.class);
        query.setParameter("username", username);
        List<Account> listAccount = query.getResultList();
        if (listAccount == null || listAccount.size() == 0) {
            return null;
        } else {
            return listAccount.get(0);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public void disableAccount(String accountId) {
        String queryString = "UPDATE Account SET isActive=false WHERE accountId=:accountId ";
        Query query = entityManager.createNativeQuery(queryString, Account.class);
        query.setParameter("accountId", accountId);
        query.executeUpdate();
    }

    @Transactional(rollbackFor = Exception.class)
    public void activeAccount(String accountId) {
        String queryString = "UPDATE Account SET isApproved=true WHERE accountId=:accountId ";
        Query query = entityManager.createNativeQuery(queryString, Account.class);
        query.setParameter("accountId", accountId);
        query.executeUpdate();
    }

    @Transactional(rollbackFor = Exception.class)
    public Account create(Account account) {
        account.setCreatedAt(new Date());
        account.setUpdatedAt(new Date());
        entityManager.persist(account);
        return account;
    }

    @Transactional(rollbackFor = Exception.class)
    public Account update(Account account) {
        account.setUpdatedAt(new Date());
        entityManager.merge(account);
        return account;
    }

}
