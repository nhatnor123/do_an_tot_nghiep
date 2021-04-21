package com.nhatnl.datn.backend.repository.impl;

import com.nhatnl.datn.backend.model.StudentCourse;
import com.nhatnl.datn.backend.repository.StudentCourseRepo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;

@Repository
public class StudentCourseRepoImpl implements StudentCourseRepo {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public StudentCourse create(StudentCourse studentCourse) {
        studentCourse.setCreatedAt(new Date());
        studentCourse.setUpdatedAt(new Date());
        entityManager.persist(studentCourse);
        return studentCourse;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public StudentCourse update(StudentCourse studentCourse) {
        studentCourse.setUpdatedAt(new Date());
        entityManager.merge(studentCourse);
        return studentCourse;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Long studentId, Long courseId, Boolean isApproved) {
        String queryString = "UPDATE StudentCourse SET isApproved=:isApproved, updatedAt =:updatedAt" +
                " WHERE studentId=:studentId AND courseId=:courseId AND isActive=true";
        Query query = entityManager.createNativeQuery(queryString, StudentCourse.class);
        query.setParameter("studentId", studentId);
        query.setParameter("courseId", courseId);
        query.setParameter("isApproved", isApproved);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    public StudentCourse getById(Long studentId, Long courseId) {
        String queryString = "select * from StudentCourse WHERE studentId=:studentId AND courseId=:courseId AND isActive=true";
        Query query = entityManager.createNativeQuery(queryString, StudentCourse.class);
        query.setParameter("studentId", studentId);
        query.setParameter("courseId", courseId);
        List<StudentCourse> resultList = query.getResultList();
        if (resultList == null || resultList.size() == 0) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    @Override
    public List<StudentCourse> search(Long studentId, Long courseId, Boolean isApproved, Date createdAtFrom,
                                      Date createdAtTo, Date updatedAtFrom, Date updatedAtTo, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT * FROM StudentCourse WHERE 1=1 AND isActive = true ");
        if (fieldList.contains("studentId")) {
            queryString.append(" AND studentId=:studentId");
        }
        if (fieldList.contains("courseId")) {
            queryString.append(" AND courseId=:courseId");
        }
        if (fieldList.contains("isApproved")) {
            queryString.append(" AND isApproved=:isApproved");
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

        Query query = entityManager.createNativeQuery(queryString.toString(), StudentCourse.class);
        if (fieldList.contains("studentId")) {
            query.setParameter("studentId", studentId);
        }
        if (fieldList.contains("courseId")) {
            query.setParameter("courseId", courseId);
        }
        if (fieldList.contains("isApproved")) {
            query.setParameter("isApproved", isApproved);
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

        List<StudentCourse> result = query.getResultList();
        return result;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void archive(Long studentId, Long courseId) {
        String queryString = "UPDATE StudentCourse SET isActive=false, updatedAt =:updatedAt"
                + " WHERE studentId=:studentId AND courseId=:courseId and isActive = true ";
        Query query = entityManager.createNativeQuery(queryString, StudentCourse.class);
        query.setParameter("studentId", studentId);
        query.setParameter("courseId", courseId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void recover(Long studentId, Long courseId) {
        String queryString = "UPDATE StudentCourse SET isActive=true, updatedAt =:updatedAt"
                + " WHERE studentId=:studentId AND courseId=:courseId and isActive = false";
        Query query = entityManager.createNativeQuery(queryString, StudentCourse.class);
        query.setParameter("studentId", studentId);
        query.setParameter("courseId", courseId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

}
