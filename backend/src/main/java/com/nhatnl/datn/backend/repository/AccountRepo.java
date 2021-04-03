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

    @Transactional(rollbackFor = Exception.class)
    public void updateInfoAccount(String username, String firstName, String lastName, String phoneNo, String address,
                                  String imageUrl, Date birthday, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("UPDATE Account SET");
        if (fieldList.contains("firstName")) {
            queryString.append(" firstName = :firstName");
        }
        if (fieldList.contains("lastName")) {
            queryString.append(" lastName = :lastName");
        }
        if (fieldList.contains("phoneNo")) {
            queryString.append(" phoneNo = :phoneNo");
        }
        if (fieldList.contains("address")) {
            queryString.append(" address = :address");
        }
        if (fieldList.contains("imageUrl")) {
            queryString.append(" imageUrl = :imageUrl");
        }
        if (fieldList.contains("birthday")) {
            queryString.append(" birthday = :birthday");
        }
        queryString.append(" WHERE username=:username AND isActive = true");

        Query query = entityManager.createNativeQuery(queryString.toString(), Account.class);

        query.setParameter("username", username);
        if (fieldList.contains("firstName")) {
            query.setParameter("firstName", firstName);
        }
        if (fieldList.contains("lastName")) {
            query.setParameter("lastName", lastName);
        }
        if (fieldList.contains("phoneNo")) {
            query.setParameter("phoneNo", phoneNo);
        }
        if (fieldList.contains("address")) {
            query.setParameter("address", address);
        }
        if (fieldList.contains("imageUrl")) {
            query.setParameter("imageUrl", imageUrl);
        }
        if (fieldList.contains("birthday")) {
            query.setParameter("birthday", birthday);
        }
        query.executeUpdate();
    }

    public Account getById(Long accountId) {
        String queryString = "select * from Account where accountId = :accountId";
        Query query = entityManager.createNativeQuery(queryString, Account.class);
        query.setParameter("accountId", accountId);
        List<Account> listAccount = query.getResultList();
        if (listAccount == null || listAccount.size() == 0) {
            return null;
        } else {
            return listAccount.get(0);
        }
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

    public List<Account> search(Long accountId, String username, String email, String firstName, String lastName,
                                Account.Role role, String phoneNo, String address, Date birthdayFrom, Date birthdayTo,
                                Boolean isActive, Date createdAtFrom, Date createdAtTo, Date updatedAtFrom,
                                Date updatedAtTo, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT * FROM Account WHERE 1=1 ");
        if (fieldList.contains("accountId")) {
            queryString.append(" AND accountID=:accountId");
        }
        if (fieldList.contains("username")) {
            queryString.append(" AND UPPER(username) LIKE :username");
        }
        if (fieldList.contains("email")) {
            queryString.append(" AND UPPER(email) LIKE :email");
        }
        if (fieldList.contains("firstName")) {
            queryString.append(" AND UPPER(firstName) LIKE :firstName");
        }
        if (fieldList.contains("lastName")) {
            queryString.append(" AND UPPER(lastName) LIKE :lastName");
        }
        if (fieldList.contains("role")) {
            queryString.append(" AND role=:role");
        }
        if (fieldList.contains("phoneNo")) {
            queryString.append(" AND UPPER(phoneNo) LIKE phoneNo");
        }
        if (fieldList.contains("address")) {
            queryString.append(" AND UPPER(address) LIKE address");
        }
        if (fieldList.contains("birthdayFrom")) {
            queryString.append(" AND birthday >= :birthdayFrom");
        }
        if (fieldList.contains("birthdayTo")) {
            queryString.append(" AND birthday <= :birthdayTo");
        }
        if (fieldList.contains("isActive")) {
            queryString.append(" AND isActive=:isActive");
        }
        if (fieldList.contains("createdAtFrom")) {
            queryString.append(" AND createdAt >= :createdAtFrom");
        }
        if (fieldList.contains("createdAtTo")) {
            queryString.append(" AND createdAt <= :createdAtTo");
        }
        if (fieldList.contains("updatedAtFrom")) {
            queryString.append(" AND updatedAt >= :updatedAtFrom");
        }
        if (fieldList.contains("updatedAtTo")) {
            queryString.append(" AND updatedAt <= :updatedAtTo");
        }

        Query query = entityManager.createNativeQuery(queryString.toString(), Account.class);
        if (fieldList.contains("accountId")) {
            query.setParameter("accountId", accountId);
        }
        if (fieldList.contains("username")) {
            query.setParameter("username", "%" + username.toUpperCase() + "%");
        }
        if (fieldList.contains("email")) {
            query.setParameter("email", "%" + email.toUpperCase() + "%");
        }
        if (fieldList.contains("firstName")) {
            query.setParameter("firstName", "%" + firstName.toUpperCase() + "%");
        }
        if (fieldList.contains("lastName")) {
            query.setParameter("lastName", "%" + lastName.toUpperCase() + "%");
        }
        if (fieldList.contains("role")) {
            query.setParameter("role", role.name());
        }
        if (fieldList.contains("phoneNo")) {
            query.setParameter("phoneNo", "%" + phoneNo.toUpperCase() + "%");
        }
        if (fieldList.contains("address")) {
            query.setParameter("address", "%" + address.toUpperCase() + "%");
        }
        if (fieldList.contains("birthdayFrom")) {
            query.setParameter("birthdayFrom", birthdayFrom);
        }
        if (fieldList.contains("birthdayTo")) {
            query.setParameter("birthdayTo", birthdayTo);
        }
        if (fieldList.contains("isActive")) {
            query.setParameter("isActive", isActive);
        }
        if (fieldList.contains("createdAtFrom")) {
            query.setParameter("createdAtFrom", createdAtFrom);
        }
        if (fieldList.contains("createdAtTo")) {
            query.setParameter("createdAtTo", createdAtTo);
        }
        if (fieldList.contains("updatedAtFrom")) {
            query.setParameter("updatedAtFrom", updatedAtFrom);
        }
        if (fieldList.contains("updatedAtTo")) {
            query.setParameter("updatedAtTo", updatedAtTo);
        }

        return (List<Account>) query.getResultList();
    }

    @Transactional(rollbackFor = Exception.class)
    public void lockAccount(Long accountId) {
        String queryString = "UPDATE Account SET isActive=false WHERE accountId=:accountId ";
        Query query = entityManager.createNativeQuery(queryString, Account.class);
        query.setParameter("accountId", accountId);
        query.executeUpdate();
    }

    @Transactional(rollbackFor = Exception.class)
    public void unlockAccount(Long accountId) {
        String queryString = "UPDATE Account SET isActive=true WHERE accountId=:accountId ";
        Query query = entityManager.createNativeQuery(queryString, Account.class);
        query.setParameter("accountId", accountId);
        query.executeUpdate();
    }

}
