package com.nhatnl.datn.backend.repository.impl;

import com.nhatnl.datn.backend.dto.response.statistic.GetDateTimeAndQuantityResp;
import com.nhatnl.datn.backend.dto.response.statistic.GetTotalNumberResp;
import com.nhatnl.datn.backend.model.Comment;
import com.nhatnl.datn.backend.repository.CommentRepo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;

@Repository
public class CommentRepoImpl implements CommentRepo {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Comment create(Comment comment) {
        comment.setCreatedAt(new Date());
        comment.setUpdatedAt(new Date());
        entityManager.persist(comment);
        return comment;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Comment update(Comment comment) {
        comment.setUpdatedAt(new Date());
        entityManager.merge(comment);
        return comment;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Long commentId, String content) {
        String queryString = "UPDATE Comment SET content =:content, updatedAt = :updatedAt WHERE commentId=:commentId AND isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Comment.class);
        query.setParameter("commentId", commentId);
        query.setParameter("content", content);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    public Comment getById(Long commentId) {
        String queryString = "select * from Comment where commentId = :commentId and isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Comment.class);
        query.setParameter("commentId", commentId);
        List<Comment> listAccount = query.getResultList();
        if (listAccount == null || listAccount.size() == 0) {
            return null;
        } else {
            return listAccount.get(0);
        }
    }

    @Override
    public List<Comment> search(Long commentId, Long commentParentId, Long lessonId, Long accountId, String content,
                                Date createdAtFrom, Date createdAtTo, Date updatedAtFrom, Date updatedAtTo,
                                List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT * FROM Comment WHERE 1=1 AND isActive = true");
        if (fieldList.contains("commentId")) {
            queryString.append(" AND commentId IN :commentId");
        }
        if (fieldList.contains("commentParentId")) {
            queryString.append(" AND commentParentId=:commentParentId");
        }
        if (fieldList.contains("lessonId")) {
            queryString.append(" AND lessonId=:lessonId");
        }
        if (fieldList.contains("accountId")) {
            queryString.append(" AND accountId=:accountId");
        }
        if (fieldList.contains("content")) {
            queryString.append(" AND UPPER(content) LIKE :content");
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

        Query query = entityManager.createNativeQuery(queryString.toString(), Comment.class);
        if (fieldList.contains("commentId")) {
            query.setParameter("commentId", commentId);
        }
        if (fieldList.contains("commentParentId")) {
            query.setParameter("commentParentId", commentParentId);
        }
        if (fieldList.contains("lessonId")) {
            query.setParameter("lessonId", lessonId);
        }
        if (fieldList.contains("accountId")) {
            query.setParameter("accountId", accountId);
        }
        if (fieldList.contains("content")) {
            query.setParameter("content", "%" + content.toUpperCase() + "%");
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

        return (List<Comment>) query.getResultList();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void archive(Long commentId) {
        String queryString = "UPDATE Comment SET isActive=false, updatedAt =:updatedAt WHERE commentId=:commentId AND isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Comment.class);
        query.setParameter("commentId", commentId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    public void recover(Long commentId) {
        String queryString = "UPDATE Comment SET isActive=true, updatedAt =:updatedAt WHERE commentId=:commentId AND isActive = false";
        Query query = entityManager.createNativeQuery(queryString, Comment.class);
        query.setParameter("commentId", commentId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    public GetTotalNumberResp getTotalActive() {
        String queryString = "SELECT \n" +
                "    COUNT(*) AS quantity\n" +
                "FROM\n" +
                "    Comment\n" +
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
                "    Comment\n" +
                "WHERE\n" +
                "    isActive = TRUE\n" +
                "GROUP BY DATE(createdAt)";
        Query query = entityManager.createNativeQuery(queryString, GetDateTimeAndQuantityResp.class);
        List<GetDateTimeAndQuantityResp> resultList = query.getResultList();

        return resultList;
    }
}
