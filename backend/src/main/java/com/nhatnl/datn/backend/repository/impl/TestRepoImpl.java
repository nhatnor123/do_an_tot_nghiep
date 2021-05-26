package com.nhatnl.datn.backend.repository.impl;

import com.nhatnl.datn.backend.dto.response.statistic.GetDateTimeAndQuantityResp;
import com.nhatnl.datn.backend.dto.response.statistic.GetTotalNumberResp;
import com.nhatnl.datn.backend.model.Test;
import com.nhatnl.datn.backend.repository.TestRepo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;

@Repository
public class TestRepoImpl implements TestRepo {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Test create(Test test) {
        test.setCreatedAt(new Date());
        test.setUpdatedAt(new Date());
        entityManager.persist(test);
        return test;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Test update(Test test) {
        test.setUpdatedAt(new Date());
        entityManager.merge(test);
        return test;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Long testId, String name, String description, String content, String answer, Date dateTimeStart,
                       Date dateTimeEnd, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("UPDATE Test SET updatedAt =:updatedAt ,");
        if (fieldList.contains("name")) {
            queryString.append(" name = :name ,");
        }
        if (fieldList.contains("description")) {
            queryString.append(" description = :description ,");
        }
        if (fieldList.contains("content")) {
            queryString.append(" content = :content ,");
        }
        if (fieldList.contains("answer")) {
            queryString.append(" answer = :answer ,");
        }
        if (fieldList.contains("dateTimeStart")) {
            queryString.append(" dateTimeStart = :dateTimeStart ,");
        }
        if (fieldList.contains("dateTimeEnd")) {
            queryString.append(" dateTimeEnd = :dateTimeEnd ,");
        }
        queryString.deleteCharAt(queryString.length() - 1);
        queryString.append(" WHERE testId = :testId AND isActive = true");

        Query query = entityManager.createNativeQuery(queryString.toString(), Test.class);

        query.setParameter("testId", testId);
        query.setParameter("updatedAt", new Date());
        if (fieldList.contains("name")) {
            query.setParameter("name", name);
        }
        if (fieldList.contains("description")) {
            query.setParameter("description", description);
        }
        if (fieldList.contains("content")) {
            query.setParameter("content", content);
        }
        if (fieldList.contains("answer")) {
            query.setParameter("answer", answer);
        }
        if (fieldList.contains("dateTimeStart")) {
            query.setParameter("dateTimeStart", dateTimeStart);
        }
        if (fieldList.contains("dateTimeEnd")) {
            query.setParameter("dateTimeEnd", dateTimeEnd);
        }

        query.executeUpdate();
    }

    @Override
    public Test getById(Long testId) {
        String queryString = "select * from Test where testId = :testId and isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Test.class);
        query.setParameter("testId", testId);
        List<Test> resultList = query.getResultList();
        if (resultList == null || resultList.size() == 0) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    @Override
    public List<Test> search(Long testId, Long courseId, String name, String description, String content, String answer,
                             Date dateTimeStartFrom, Date dateTimeStartTo, Date dateTimeEndFrom, Date dateTimeEndTo,
                             Date createdAtFrom, Date createdAtTo, Date updatedAtFrom, Date updatedAtTo, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT * FROM Test WHERE 1=1 AND isActive = true ");
        if (fieldList.contains("testId")) {
            queryString.append(" AND testId=:testId");
        }
        if (fieldList.contains("courseId")) {
            queryString.append(" AND courseId=:courseId");
        }
        if (fieldList.contains("name")) {
            queryString.append(" AND UPPER(name) LIKE :name");
        }
        if (fieldList.contains("description")) {
            queryString.append(" AND UPPER(description) LIKE :description");
        }
        if (fieldList.contains("content")) {
            queryString.append(" AND UPPER(content) LIKE :content");
        }
        if (fieldList.contains("answer")) {
            queryString.append(" AND UPPER(answer) LIKE :answer");
        }
        if (fieldList.contains("dateTimeStartFrom")) {
            queryString.append(" AND dateTimeStart >= :dateTimeStartFrom");
        }
        if (fieldList.contains("dateTimeStartTo")) {
            queryString.append(" AND dateTimeStart <= :dateTimeStartTo");
        }
        if (fieldList.contains("dateTimeEndFrom")) {
            queryString.append(" AND dateTimeEnd >= :dateTimeEndFrom");
        }
        if (fieldList.contains("dateTimeEndTo")) {
            queryString.append(" AND dateTimeEnd <= :dateTimeEndTo");
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

        Query query = entityManager.createNativeQuery(queryString.toString(), Test.class);
        if (fieldList.contains("testId")) {
            query.setParameter("testId", testId);
        }
        if (fieldList.contains("courseId")) {
            query.setParameter("courseId", courseId);
        }
        if (fieldList.contains("name")) {
            query.setParameter("name", "%" + name.toUpperCase() + "%");
        }
        if (fieldList.contains("description")) {
            query.setParameter("description", "%" + description.toUpperCase() + "%");
        }
        if (fieldList.contains("content")) {
            query.setParameter("content", "%" + content.toUpperCase() + "%");
        }
        if (fieldList.contains("answer")) {
            query.setParameter("answer", "%" + answer.toUpperCase() + "%");
        }
        if (fieldList.contains("dateTimeStartFrom")) {
            query.setParameter("dateTimeStartFrom", dateTimeStartFrom);
        }
        if (fieldList.contains("dateTimeStartTo")) {
            query.setParameter("dateTimeStartTo", dateTimeStartTo);
        }
        if (fieldList.contains("dateTimeEndFrom")) {
            query.setParameter("dateTimeEndFrom", dateTimeEndFrom);
        }
        if (fieldList.contains("dateTimeEndTo")) {
            query.setParameter("dateTimeEndTo", dateTimeEndTo);
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

        return (List<Test>) query.getResultList();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void archive(Long testId) {
        String queryString = "UPDATE Test SET isActive=false, updatedAt =:updatedAt WHERE testId=:testId and isActive = true ";
        Query query = entityManager.createNativeQuery(queryString, Test.class);
        query.setParameter("testId", testId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void recover(Long testId) {
        String queryString = "UPDATE Test SET isActive=true, updatedAt =:updatedAt WHERE testId=:testId and isActive = false";
        Query query = entityManager.createNativeQuery(queryString, Test.class);
        query.setParameter("testId", testId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }


    @Override
    public GetTotalNumberResp getTotalActive() {
        String queryString = "SELECT \n" +
                "    COUNT(*) AS quantity\n" +
                "FROM\n" +
                "    Test\n" +
                "WHERE\n" +
                "    isActive = TRUE";
        Query query = entityManager.createNativeQuery(queryString, GetTotalNumberResp.class);
        List<GetTotalNumberResp> resultList = query.getResultList();

        return resultList.get(0);
    }

    @Override
    public List<GetDateTimeAndQuantityResp> getDetailStatistic() {
        String queryString = "SELECT \n" +
                "    DATE(createdAt) AS dateTime, COUNT(*) AS quantity\n" +
                "FROM\n" +
                "    Test\n" +
                "WHERE\n" +
                "    isActive = TRUE\n" +
                "GROUP BY DATE(createdAt)";
        Query query = entityManager.createNativeQuery(queryString, GetDateTimeAndQuantityResp.class);
        List<GetDateTimeAndQuantityResp> resultList = query.getResultList();

        return resultList;
    }

}
