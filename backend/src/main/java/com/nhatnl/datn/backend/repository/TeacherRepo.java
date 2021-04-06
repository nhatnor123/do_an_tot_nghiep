package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.model.Teacher;

import java.util.Date;
import java.util.List;

public interface TeacherRepo {
    Teacher create(Teacher teacher);

    Teacher update(Teacher teacher);

    void updateTeacherInfo(Long accountId, String displayName, String description,Boolean isPublic, List<String> fieldList);

    Teacher getById(Long teacherId);

    Teacher getByAccountId(Long accountId);

    List<Teacher> search(Long teacherId, Long accountId, String displayName, String description, Boolean isPublic,
                         Boolean isActive, Date createdAtFrom, Date createdAtTo, Date updatedAtFrom,
                         Date updatedAtTo, List<String> fieldList);

    void archiveById(Long teacherId);

    void archiveByAccountId(Long accountId);

    void recoverById(Long teacherId);

    void recoverByAccountId(Long accountId);

}
