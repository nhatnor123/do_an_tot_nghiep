package com.nhatnl.datn.backend.repository.impl;

import com.nhatnl.datn.backend.model.Lesson;
import com.nhatnl.datn.backend.repository.LessonRepo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;

@Repository
public class LessonRepoImpl implements LessonRepo {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Lesson create(Lesson lesson) {
        lesson.setCreatedAt(new Date());
        lesson.setUpdatedAt(new Date());
        entityManager.persist(lesson);
        return lesson;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Lesson update(Lesson lesson) {
        lesson.setUpdatedAt(new Date());
        entityManager.merge(lesson);
        return lesson;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateLessonInfo(Long lessonId, String name, String description, String content, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("UPDATE Lesson SET updatedAt =:updatedAt ,");
        if (fieldList.contains("name")) {
            queryString.append(" name = :name ,");
        }
        if (fieldList.contains("description")) {
            queryString.append(" description = :description ,");
        }
        if (fieldList.contains("content")) {
            queryString.append(" content = :content ,");
        }
        queryString.deleteCharAt(queryString.length() - 1);
        queryString.append(" WHERE lessonId = :lessonId AND isActive = true");

        Query query = entityManager.createNativeQuery(queryString.toString(), Lesson.class);

        query.setParameter("lessonId", lessonId);
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

        query.executeUpdate();
    }

    @Override
    public Lesson getById(Long lessonId) {
        String queryString = "select * from Lesson where lessonId = :lessonId and isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Lesson.class);
        query.setParameter("lessonId", lessonId);
        List<Lesson> listAccount = query.getResultList();
        if (listAccount == null || listAccount.size() == 0) {
            return null;
        } else {
            return listAccount.get(0);
        }
    }

    @Override
    public List<Lesson> search(Long lessonId, Long courseId, String name, String description, String content,
                               Date createdAtFrom, Date createdAtTo, Date updatedAtFrom,
                               Date updatedAtTo, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT * FROM Lesson WHERE 1=1 AND isActive = true ");
        if (fieldList.contains("lessonId")) {
            queryString.append(" AND lessonId=:lessonId");
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

        Query query = entityManager.createNativeQuery(queryString.toString(), Lesson.class);
        if (fieldList.contains("lessonId")) {
            query.setParameter("lessonId", lessonId);
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

        return (List<Lesson>) query.getResultList();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void archive(Long lessonId) {
        String queryString = "UPDATE Lesson SET isActive=false, updatedAt =:updatedAt WHERE lessonId=:lessonId and isActive = true ";
        Query query = entityManager.createNativeQuery(queryString, Lesson.class);
        query.setParameter("lessonId", lessonId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void recover(Long lessonId) {
        String queryString = "UPDATE Lesson SET isActive=true, updatedAt =:updatedAt WHERE lessonId=:lessonId and isActive = false";
        Query query = entityManager.createNativeQuery(queryString, Lesson.class);
        query.setParameter("lessonId", lessonId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

}
