package com.nhatnl.datn.backend.repository.impl;

import com.nhatnl.datn.backend.model.StudentTest;
import com.nhatnl.datn.backend.repository.StudentTestRepo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;

@Repository
public class StudentTestRepoImpl implements StudentTestRepo {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public StudentTest create(StudentTest studentTest) {
        entityManager.persist(studentTest);
        return studentTest;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public StudentTest update(StudentTest studentTest) {
        entityManager.merge(studentTest);
        return studentTest;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Long studentId, Long testId, String score, String feedback, Date feedbackAt, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("UPDATE StudentTest SET ");
        if (fieldList.contains("score")) {
            queryString.append(" score = :score ,");
        }
        if (fieldList.contains("feedback")) {
            queryString.append(" feedback = :feedback ,");
        }
        if (fieldList.contains("feedbackAt")) {
            queryString.append(" feedbackAt = :feedbackAt ,");
        }
        queryString.deleteCharAt(queryString.length() - 1);
        queryString.append(" WHERE studentId = :studentId AND testId = :testId ");

        Query query = entityManager.createNativeQuery(queryString.toString(), StudentTest.class);

        query.setParameter("studentId", studentId);
        query.setParameter("testId", testId);
        if (fieldList.contains("score")) {
            query.setParameter("score", score);
        }
        if (fieldList.contains("feedback")) {
            query.setParameter("feedback", feedback);
        }
        if (fieldList.contains("feedbackAt")) {
            query.setParameter("feedbackAt", feedbackAt);
        }

        query.executeUpdate();
    }

    @Override
    public StudentTest getById(Long studentId, Long testId) {
        String queryString = "select * from StudentTest where studentId = :studentId AND testId = :testId";
        Query query = entityManager.createNativeQuery(queryString, StudentTest.class);
        query.setParameter("studentId", studentId);
        query.setParameter("testId", testId);
        List<StudentTest> resultList = query.getResultList();
        if (resultList == null || resultList.size() == 0) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    @Override
    public List<StudentTest> search(Long studentId, Long testId, String content, String score, String feedback,
                                    Date doAtFrom, Date doAtTo, Date feedbackAtFrom, Date feedbackAtTo, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT * FROM StudentTest WHERE 1=1 ");
        if (fieldList.contains("studentId")) {
            queryString.append(" AND studentId=:studentId");
        }
        if (fieldList.contains("testId")) {
            queryString.append(" AND testId=:testId");
        }
        if (fieldList.contains("content")) {
            queryString.append(" AND UPPER(content) LIKE :content");
        }
        if (fieldList.contains("score")) {
            queryString.append(" AND UPPER(score) LIKE :score");
        }
        if (fieldList.contains("feedback")) {
            queryString.append(" AND UPPER(feedback) LIKE :feedback");
        }
        if (fieldList.contains("doAtFrom")) {
            queryString.append(" AND doAtFrom >= :doAtFrom");
        }
        if (fieldList.contains("doAtTo")) {
            queryString.append(" AND doAtTo <= :doAtTo");
        }
        if (fieldList.contains("feedbackAtFrom")) {
            queryString.append(" AND feedbackAtFrom >= :feedbackAtFrom");
        }
        if (fieldList.contains("feedbackAtTo")) {
            queryString.append(" AND feedbackAtTo <= :feedbackAtTo");
        }

        Query query = entityManager.createNativeQuery(queryString.toString(), StudentTest.class);
        if (fieldList.contains("studentId")) {
            query.setParameter("studentId", studentId);
        }
        if (fieldList.contains("testId")) {
            query.setParameter("testId", testId);
        }
        if (fieldList.contains("content")) {
            query.setParameter("content", "%" + content.toUpperCase() + "%");
        }
        if (fieldList.contains("score")) {
            query.setParameter("score", "%" + score.toUpperCase() + "%");
        }
        if (fieldList.contains("content")) {
            query.setParameter("content", "%" + content.toUpperCase() + "%");
        }
        if (fieldList.contains("feedback")) {
            query.setParameter("feedback", "%" + feedback.toUpperCase() + "%");
        }
        if (fieldList.contains("doAtFrom")) {
            query.setParameter("doAtFrom", doAtFrom);
        }
        if (fieldList.contains("doAtTo")) {
            query.setParameter("doAtTo", doAtTo);
        }
        if (fieldList.contains("feedbackAtFrom")) {
            query.setParameter("feedbackAtFrom", feedbackAtFrom);
        }
        if (fieldList.contains("feedbackAtTo")) {
            query.setParameter("feedbackAtTo", feedbackAtTo);
        }

        return (List<StudentTest>) query.getResultList();
    }


}
