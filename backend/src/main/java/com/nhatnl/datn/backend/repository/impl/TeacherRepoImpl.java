package com.nhatnl.datn.backend.repository.impl;

import com.nhatnl.datn.backend.model.Teacher;
import com.nhatnl.datn.backend.repository.TeacherRepo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;

@Repository
public class TeacherRepoImpl implements TeacherRepo {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Teacher create(Teacher teacher) {
        teacher.setCreatedAt(new Date());
        teacher.setUpdatedAt(new Date());
        entityManager.persist(teacher);
        return teacher;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Teacher update(Teacher teacher) {
        teacher.setUpdatedAt(new Date());
        entityManager.merge(teacher);
        return teacher;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateTeacherInfo(Long accountId, String displayName, String description, Boolean isPublic, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("UPDATE Teacher SET updatedAt =:updatedAt ,");
        if (fieldList.contains("displayName")) {
            queryString.append(" displayName = :displayName ,");
        }
        if (fieldList.contains("description")) {
            queryString.append(" description = :description ,");
        }
        if (fieldList.contains("isPublic")) {
            queryString.append(" isPublic = :isPublic ,");
        }
        queryString.deleteCharAt(queryString.length() - 1);
        queryString.append(" WHERE accountId=:accountId AND isActive = true");

        Query query = entityManager.createNativeQuery(queryString.toString(), Teacher.class);

        query.setParameter("accountId", accountId);
        query.setParameter("updatedAt", new Date());
        if (fieldList.contains("displayName")) {
            query.setParameter("displayName", displayName);
        }
        if (fieldList.contains("description")) {
            query.setParameter("description", description);
        }
        if (fieldList.contains("isPublic")) {
            query.setParameter("isPublic", isPublic);
        }

        query.executeUpdate();
    }

    @Override
    public Teacher getById(Long teacherId) {
        String queryString = "select * from Teacher where teacherId = :teacherId and isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Teacher.class);
        query.setParameter("teacherId", teacherId);
        List<Teacher> listAccount = query.getResultList();
        if (listAccount == null || listAccount.size() == 0) {
            return null;
        } else {
            return listAccount.get(0);
        }
    }

    @Override
    public Teacher getByAccountId(Long accountId) {
        String queryString = "select * from Teacher where accountId = :accountId and isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Teacher.class);
        query.setParameter("accountId", accountId);
        List<Teacher> listAccount = query.getResultList();
        if (listAccount == null || listAccount.size() == 0) {
            return null;
        } else {
            return listAccount.get(0);
        }
    }

    @Override
    public List<Teacher> search(Long teacherId, Long accountId, String displayName, String description, Boolean isPublic,
                                Date createdAtFrom, Date createdAtTo, Date updatedAtFrom,
                                Date updatedAtTo, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT * FROM Teacher WHERE 1=1 AND isActive = true");
        if (fieldList.contains("teacherId")) {
            queryString.append(" AND teacherId=:teacherId");
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
        if (fieldList.contains("isPublic")) {
            queryString.append(" AND isPublic=:isPublic");
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

        Query query = entityManager.createNativeQuery(queryString.toString(), Teacher.class);
        if (fieldList.contains("teacherId")) {
            query.setParameter("teacherId", teacherId);
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
        if (fieldList.contains("isPublic")) {
            query.setParameter("isPublic", isPublic);
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

        return (List<Teacher>) query.getResultList();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void archiveById(Long teacherId) {
        String queryString = "UPDATE Teacher SET isActive=false, updatedAt =:updatedAt WHERE teacherId=:teacherId AND isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Teacher.class);
        query.setParameter("teacherId", teacherId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void archiveByAccountId(Long accountId) {
        String queryString = "UPDATE Teacher SET isActive=false, updatedAt =:updatedAt WHERE accountId=:accountId AND isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Teacher.class);
        query.setParameter("accountId", accountId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void recoverById(Long teacherId) {
        String queryString = "UPDATE Teacher SET isActive=true, updatedAt =:updatedAt WHERE teacherId=:teacherId AND isActive = false";
        Query query = entityManager.createNativeQuery(queryString, Teacher.class);
        query.setParameter("teacherId", teacherId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void recoverByAccountId(Long accountId) {
        String queryString = "UPDATE Teacher SET isActive=true, updatedAt =:updatedAt WHERE accountId=:accountId AND isActive = false";
        Query query = entityManager.createNativeQuery(queryString, Teacher.class);
        query.setParameter("accountId", accountId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

}
