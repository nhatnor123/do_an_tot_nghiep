package com.nhatnl.datn.backend.repository.impl;

import com.nhatnl.datn.backend.model.Course;
import com.nhatnl.datn.backend.repository.CourseRepo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;

@Repository
public class CourseRepoImpl implements CourseRepo {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Course create(Course course) {
        course.setCreatedAt(new Date());
        course.setUpdatedAt(new Date());
        entityManager.persist(course);
        return course;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Course update(Course course) {
        course.setUpdatedAt(new Date());
        entityManager.merge(course);
        return course;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateCourseInfo(Long courseId, Long teacherId, String name, String description, String imageUrl, String code,
                                 Boolean isPublic, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("UPDATE Course SET updatedAt = :updatedAt ,");
        if (fieldList.contains("name")) {
            queryString.append(" name = :name ,");
        }
        if (fieldList.contains("description")) {
            queryString.append(" description = :description ,");
        }
        if (fieldList.contains("imageUrl")) {
            queryString.append(" imageUrl = :imageUrl ,");
        }
        if (fieldList.contains("code")) {
            queryString.append(" code = :code ,");
        }
        if (fieldList.contains("isPublic")) {
            queryString.append(" isPublic = :isPublic ,");
        }
        queryString.deleteCharAt(queryString.length() - 1);
        queryString.append(" WHERE courseId=:courseId AND teacherId=:teacherId AND isActive = true");

        Query query = entityManager.createNativeQuery(queryString.toString(), Course.class);

        query.setParameter("courseId", courseId);
        query.setParameter("teacherId", teacherId);
        query.setParameter("updatedAt", new Date());
        if (fieldList.contains("name")) {
            query.setParameter("name", name);
        }
        if (fieldList.contains("description")) {
            query.setParameter("description", description);
        }
        if (fieldList.contains("imageUrl")) {
            query.setParameter("imageUrl", imageUrl);
        }
        if (fieldList.contains("code")) {
            query.setParameter("code", code);
        }
        if (fieldList.contains("isPublic")) {
            query.setParameter("isPublic", isPublic);
        }

        query.executeUpdate();
    }

    @Override
    public Course getById(Long courseId) {
        String queryString = "select * from Course where courseId = :courseId and isActive = true";
        Query query = entityManager.createNativeQuery(queryString, Course.class);
        query.setParameter("courseId", courseId);
        List<Course> listAccount = query.getResultList();
        if (listAccount == null || listAccount.size() == 0) {
            return null;
        } else {
            return listAccount.get(0);
        }
    }

    @Override
    public Course getByIdAndTeacherId(Long courseId, Long teacherId) {
        String queryString = "select * from Course where courseId = :courseId and teacherId = :teacherId and isActive=true";
        Query query = entityManager.createNativeQuery(queryString, Course.class);
        query.setParameter("courseId", courseId);
        query.setParameter("teacherId", teacherId);
        List<Course> listAccount = query.getResultList();
        if (listAccount == null || listAccount.size() == 0) {
            return null;
        } else {
            return listAccount.get(0);
        }
    }

    @Override
    public List<Course> search(Long courseId, Long teacherId, String name, String description, Boolean isPublic,
                               Date createdAtFrom, Date createdAtTo, Date updatedAtFrom,
                               Date updatedAtTo, List<String> fieldList) {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT * FROM Course WHERE 1=1 AND isActive = true ");
        if (fieldList.contains("courseId")) {
            queryString.append(" AND courseId=:courseId");
        }
        if (fieldList.contains("teacherId")) {
            queryString.append(" AND teacherId=:teacherId");
        }
        if (fieldList.contains("name")) {
            queryString.append(" AND UPPER(name) LIKE :name");
        }
        if (fieldList.contains("description")) {
            queryString.append(" AND UPPER(description) LIKE :description");
        }
        if (fieldList.contains("isPublic")) {
            queryString.append(" AND isPublic=:isPublic");
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

        Query query = entityManager.createNativeQuery(queryString.toString(), Course.class);
        if (fieldList.contains("courseId")) {
            query.setParameter("courseId", courseId);
        }
        if (fieldList.contains("teacherId")) {
            query.setParameter("teacherId", teacherId);
        }
        if (fieldList.contains("name")) {
            query.setParameter("name", "%" + name.toUpperCase() + "%");
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

        return (List<Course>) query.getResultList();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void archive(Long courseId, Long teacherId) {
        String queryString = "UPDATE Course SET isActive=false, updatedAt=:updatedAt WHERE courseId=:courseId AND teacherId = :teacherId and isActive = true ";
        Query query = entityManager.createNativeQuery(queryString, Course.class);
        query.setParameter("courseId", courseId);
        query.setParameter("teacherId", teacherId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void recover(Long courseId, Long teacherId) {
        String queryString = "UPDATE Course SET isActive=true, updatedAt=:updatedAt WHERE courseId=:courseId AND teacherId = :teacherId and isActive = false";
        Query query = entityManager.createNativeQuery(queryString, Course.class);
        query.setParameter("courseId", courseId);
        query.setParameter("teacherId", teacherId);
        query.setParameter("updatedAt", new Date());
        query.executeUpdate();
    }

    @Override
    public List<Course> getCoursesStudentJoining(Long studentId){
        String queryString = "SELECT \n" +
                "    Course.*\n" +
                "FROM\n" +
                "    StudentCourse\n" +
                "        JOIN\n" +
                "    Course ON StudentCourse.courseId = Course.courseId\n" +
                "WHERE\n" +
                "    Course.isActive = TRUE\n" +
                "        AND StudentCourse.isActive = TRUE\n" +
                "        AND StudentCourse.studentId = :studentId";
        Query query = entityManager.createNativeQuery(queryString, Course.class);
        query.setParameter("studentId", studentId);
        return query.getResultList();
    }


    @Override
    public List<Course> getCoursesStudentCanJoin(Long studentId){
        String queryString = "SELECT \n" +
                "    *\n" +
                "FROM\n" +
                "    Course\n" +
                "WHERE\n" +
                "    isActive = TRUE AND isPublic = TRUE\n" +
                "        AND courseId NOT IN (SELECT \n" +
                "            Course.courseId\n" +
                "        FROM\n" +
                "            Course\n" +
                "                JOIN\n" +
                "            StudentCourse ON Course.courseId = StudentCourse.courseId\n" +
                "        WHERE\n" +
                "            Course.isActive = TRUE\n" +
                "                AND StudentCourse.isActive = TRUE\n" +
                "                AND StudentCourse.studentId = :studentId AND StudentCourse.isApproved = TRUE )";
        Query query = entityManager.createNativeQuery(queryString, Course.class);
        query.setParameter("studentId", studentId);
        return query.getResultList();
    }

}
