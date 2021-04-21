package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.model.Student;

import java.util.Date;
import java.util.List;

public interface StudentRepo {
    Student create(Student student);

    Student update(Student student);

    void update(Long accountId, String displayName, String description, List<String> fieldList);

    Student getById(Long studentId);

    Student getByAccountId(Long accountId);

    List<Student> search(List<Long> studentIds, Long accountId, String displayName, String description,
                         Date createdAtFrom, Date createdAtTo, Date updatedAtFrom,
                         Date updatedAtTo, List<String> fieldList);

    void archiveById(Long studentId);

    void archiveByAccountId(Long accountId);

    void recoverById(Long studentId);

    void recoverByAccountId(Long accountId);

    List<Account> getStudentsNotJoinCourse(Long courseId);
}
