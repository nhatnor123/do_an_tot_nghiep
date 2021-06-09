package com.nhatnl.datn.backend.repository.impl;

import com.nhatnl.datn.backend.dto.response.statistic.GetDateTimeAndQuantityResp;
import com.nhatnl.datn.backend.dto.response.statistic.GetTotalNumberResp;
import com.nhatnl.datn.backend.model.Complaint;
import com.nhatnl.datn.backend.repository.ComplaintRepo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;

@Repository
public class ComplaintRepoImpl implements ComplaintRepo {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Complaint create(Complaint complaint) {
        complaint.setCreatedAt(new Date());
//        complaint.setUpdatedAt(new Date());
        entityManager.persist(complaint);
        return complaint;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Complaint update(Complaint complaint) {
        complaint.setUpdatedAt(new Date());
        entityManager.merge(complaint);
        return complaint;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Long complaintId, String replyContent, Long toAccountId) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("UPDATE Complaint SET updatedAt =:updatedAt , replyContent = :replyContent");
        if (toAccountId != null) {
            queryString.append(" , toAccountId = :toAccountId ");
        }
        queryString.append(" WHERE complaintId = :complaintId AND isActive = true");
        Query query = entityManager.createNativeQuery(queryString.toString(), Complaint.class);

        query.setParameter("complaintId", complaintId);
        if (toAccountId != null) {
            query.setParameter("toAccountId", toAccountId);
        }
        query.setParameter("replyContent", replyContent);
        query.setParameter("updatedAt", new Date());

        query.executeUpdate();
    }

    @Override
    public Complaint getById(Long complaintId) {
        String queryString = "select * from Complaint where complaintId = :complaintId and isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Complaint.class);
        query.setParameter("complaintId", complaintId);
        List<Complaint> resultList = query.getResultList();
        if (resultList == null || resultList.size() == 0) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    @Override
    public List<Complaint> search(Long complaintId, String name, String content, String replyContent, List<String> type,
                                  Long fromAccountId, Long toAccountId, Date createdAtFrom, Date createdAtTo, Date updatedAtFrom,
                                  Date updatedAtTo, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT * FROM Complaint WHERE 1=1 AND isActive = true ");
        if (fieldList.contains("complaintId")) {
            queryString.append(" AND complaintId=:complaintId");
        }
        if (fieldList.contains("name")) {
            queryString.append(" AND UPPER(name) LIKE :name");
        }
        if (fieldList.contains("content")) {
            queryString.append(" AND UPPER(content) LIKE :content");
        }
        if (fieldList.contains("replyContent")) {
            queryString.append(" AND UPPER(replyContent) LIKE :replyContent");
        }
        if (fieldList.contains("type")) {
            queryString.append(" AND type IN :type");
        }
        if (fieldList.contains("fromAccountId")) {
            queryString.append(" AND fromAccountId = :fromAccountId");
        }
        if (fieldList.contains("toAccountId")) {
            queryString.append(" AND toAccountId = :toAccountId");
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

        Query query = entityManager.createNativeQuery(queryString.toString(), Complaint.class);
        if (fieldList.contains("complaintId")) {
            query.setParameter("complaintId", complaintId);
        }
        if (fieldList.contains("name")) {
            query.setParameter("name", "%" + name.toUpperCase() + "%");
        }
        if (fieldList.contains("content")) {
            query.setParameter("content", "%" + content.toUpperCase() + "%");
        }
        if (fieldList.contains("replyContent")) {
            query.setParameter("replyContent", "%" + replyContent.toUpperCase() + "%");
        }
        if (fieldList.contains("type")) {
            query.setParameter("type", type);
        }
        if (fieldList.contains("fromAccountId")) {
            query.setParameter("fromAccountId", fromAccountId);
        }
        if (fieldList.contains("toAccountId")) {
            query.setParameter("toAccountId", toAccountId);
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

        return (List<Complaint>) query.getResultList();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void archive(Long complaintId) {
        String queryString = "UPDATE Complaint SET isActive=false, updatedAt =:updatedAt WHERE complaintId=:complaintId and isActive = true ";
        Query query = entityManager.createNativeQuery(queryString, Complaint.class);
        query.setParameter("complaintId", complaintId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void recover(Long complaintId) {
        String queryString = "UPDATE Complaint SET isActive=true, updatedAt =:updatedAt WHERE complaintId=:complaintId and isActive = false";
        Query query = entityManager.createNativeQuery(queryString, Complaint.class);
        query.setParameter("complaintId", complaintId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }


    @Override
    public GetTotalNumberResp getTotalActive() {
        String queryString = "SELECT \n" +
                "    COUNT(*) AS quantity\n" +
                "FROM\n" +
                "    Complaint\n" +
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
                "    Complaint\n" +
                "WHERE\n" +
                "    isActive = TRUE\n" +
                "GROUP BY DATE(createdAt)";
        Query query = entityManager.createNativeQuery(queryString, GetDateTimeAndQuantityResp.class);
        List<GetDateTimeAndQuantityResp> resultList = query.getResultList();

        return resultList;
    }

}
