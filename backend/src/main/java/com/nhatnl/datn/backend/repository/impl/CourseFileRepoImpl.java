package com.nhatnl.datn.backend.repository.impl;

import com.nhatnl.datn.backend.dto.response.statistic.GetDateTimeAndQuantityResp;
import com.nhatnl.datn.backend.dto.response.statistic.GetTotalNumberResp;
import com.nhatnl.datn.backend.model.CourseFile;
import com.nhatnl.datn.backend.repository.CourseFileRepo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;

@Repository
public class CourseFileRepoImpl implements CourseFileRepo {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public CourseFile create(CourseFile courseFile) {
        courseFile.setCreatedAt(new Date());
        courseFile.setUpdatedAt(new Date());
        entityManager.persist(courseFile);
        return courseFile;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public CourseFile update(CourseFile courseFile) {
        courseFile.setUpdatedAt(new Date());
        entityManager.merge(courseFile);
        return courseFile;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Long courseFileId, String link, String name, String description, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("UPDATE CourseFile SET updatedAt =:updatedAt ,");
        if (fieldList.contains("name")) {
            queryString.append(" name = :name ,");
        }
        if (fieldList.contains("description")) {
            queryString.append(" description = :description ,");
        }
        if (fieldList.contains("link")) {
            queryString.append(" link = :link ,");
        }
        queryString.deleteCharAt(queryString.length() - 1);
        queryString.append(" WHERE courseFileId = :courseFileId AND isActive = true");

        Query query = entityManager.createNativeQuery(queryString.toString(), CourseFile.class);

        query.setParameter("courseFileId", courseFileId);
        query.setParameter("updatedAt", new Date());
        if (fieldList.contains("name")) {
            query.setParameter("name", name);
        }
        if (fieldList.contains("description")) {
            query.setParameter("description", description);
        }
        if (fieldList.contains("link")) {
            query.setParameter("link", link);
        }

        query.executeUpdate();
    }

    @Override
    public CourseFile getById(Long courseFileId) {
        String queryString = "select * from CourseFile where courseFileId = :courseFileId and isActive = true";
        Query query = entityManager.createNativeQuery(queryString, CourseFile.class);
        query.setParameter("courseFileId", courseFileId);
        List<CourseFile> resultList = query.getResultList();
        if (resultList == null || resultList.size() == 0) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    @Override
    public List<CourseFile> search(Long courseFileId, Long courseId, String name, String description,
                                   Date createdAtFrom, Date createdAtTo, Date updatedAtFrom, Date updatedAtTo, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT * FROM CourseFile WHERE 1=1 AND isActive = true ");
        if (fieldList.contains("courseFileId")) {
            queryString.append(" AND courseFileId=:courseFileId");
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

        Query query = entityManager.createNativeQuery(queryString.toString(), CourseFile.class);
        if (fieldList.contains("courseFileId")) {
            query.setParameter("courseFileId", courseFileId);
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

        return (List<CourseFile>) query.getResultList();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void archive(Long courseFileId) {
        String queryString = "UPDATE CourseFile SET isActive=false, updatedAt =:updatedAt WHERE courseFileId=:courseFileId and isActive = true ";
        Query query = entityManager.createNativeQuery(queryString, CourseFile.class);
        query.setParameter("courseFileId", courseFileId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void recover(Long courseFileId) {
        String queryString = "UPDATE CourseFile SET isActive=true, updatedAt =:updatedAt WHERE courseFileId=:courseFileId and isActive = false";
        Query query = entityManager.createNativeQuery(queryString, CourseFile.class);
        query.setParameter("courseFileId", courseFileId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }


    @Override
    public GetTotalNumberResp getTotalActive() {
        String queryString = "SELECT \n" +
                "    COUNT(*) AS quantity\n" +
                "FROM\n" +
                "    CourseFile\n" +
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
                "    CourseFile\n" +
                "WHERE\n" +
                "    isActive = TRUE\n" +
                "GROUP BY DATE(createdAt)";
        Query query = entityManager.createNativeQuery(queryString, GetDateTimeAndQuantityResp.class);
        List<GetDateTimeAndQuantityResp> resultList = query.getResultList();

        return resultList;
    }

}
