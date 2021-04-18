package com.nhatnl.datn.backend.repository.impl;

import com.nhatnl.datn.backend.model.Student;
import com.nhatnl.datn.backend.repository.StudentRepo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;

@Repository
public class StudentRepoImpl implements StudentRepo {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Student create(Student teacher) {
        teacher.setCreatedAt(new Date());
        teacher.setUpdatedAt(new Date());
        entityManager.persist(teacher);
        return teacher;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Student update(Student teacher) {
        teacher.setUpdatedAt(new Date());
        entityManager.merge(teacher);
        return teacher;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Long accountId, String displayName, String description, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("UPDATE Student SET updatedAt =:updatedAt ,");
        if (fieldList.contains("displayName")) {
            queryString.append(" displayName = :displayName ,");
        }
        if (fieldList.contains("description")) {
            queryString.append(" description = :description ,");
        }
        queryString.deleteCharAt(queryString.length() - 1);
        queryString.append(" WHERE accountId=:accountId AND isActive = true");

        Query query = entityManager.createNativeQuery(queryString.toString(), Student.class);

        query.setParameter("accountId", accountId);
        query.setParameter("updatedAt", new Date());
        if (fieldList.contains("displayName")) {
            query.setParameter("displayName", displayName);
        }
        if (fieldList.contains("description")) {
            query.setParameter("description", description);
        }

        query.executeUpdate();
    }

    @Override
    public Student getById(Long studentId) {
        String queryString = "select * from Student where studentId = :studentId and isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Student.class);
        query.setParameter("studentId", studentId);
        List<Student> listAccount = query.getResultList();
        if (listAccount == null || listAccount.size() == 0) {
            return null;
        } else {
            return listAccount.get(0);
        }
    }

    @Override
    public Student getByAccountId(Long accountId) {
        String queryString = "select * from Student where accountId = :accountId and isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Student.class);
        query.setParameter("accountId", accountId);
        List<Student> listAccount = query.getResultList();
        if (listAccount == null || listAccount.size() == 0) {
            return null;
        } else {
            return listAccount.get(0);
        }
    }

    @Override
    public List<Student> search(Long studentId, Long accountId, String displayName, String description,
                                Boolean isActive, Date createdAtFrom, Date createdAtTo, Date updatedAtFrom,
                                Date updatedAtTo, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT * FROM Student WHERE 1=1 AND isActive = true");
        if (fieldList.contains("studentId")) {
            queryString.append(" AND studentId=:studentId");
        }
        if (fieldList.contains("accountId")) {
            queryString.append(" AND accountId=:accountId");
        }
        if (fieldList.contains("displayName")) {
            queryString.append(" AND UPPER(displayName) LIKE :displayName");
        }
        if (fieldList.contains("description")) {
            queryString.append(" AND UPPER(description) LIKE :description");
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

        Query query = entityManager.createNativeQuery(queryString.toString(), Student.class);
        if (fieldList.contains("studentId")) {
            query.setParameter("studentId", studentId);
        }
        if (fieldList.contains("accountId")) {
            query.setParameter("accountId", accountId);
        }
        if (fieldList.contains("displayName")) {
            query.setParameter("displayName", "%" + displayName.toUpperCase() + "%");
        }
        if (fieldList.contains("description")) {
            query.setParameter("description", "%" + description.toUpperCase() + "%");
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

        return (List<Student>) query.getResultList();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void archiveById(Long studentId) {
        String queryString = "UPDATE Student SET isActive=false, updatedAt =:updatedAt WHERE studentId=:studentId AND isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Student.class);
        query.setParameter("studentId", studentId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void archiveByAccountId(Long accountId) {
        String queryString = "UPDATE Student SET isActive=false, updatedAt =:updatedAt WHERE accountId=:accountId AND isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Student.class);
        query.setParameter("accountId", accountId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void recoverById(Long studentId) {
        String queryString = "UPDATE Student SET isActive=true, updatedAt =:updatedAt WHERE studentId=:studentId AND isActive = false";
        Query query = entityManager.createNativeQuery(queryString, Student.class);
        query.setParameter("studentId", studentId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void recoverByAccountId(Long accountId) {
        String queryString = "UPDATE Student SET isActive=true, updatedAt =:updatedAt WHERE accountId=:accountId AND isActive = false";
        Query query = entityManager.createNativeQuery(queryString, Student.class);
        query.setParameter("accountId", accountId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }
}
