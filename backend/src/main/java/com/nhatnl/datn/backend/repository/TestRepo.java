package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.model.Test;

import java.util.Date;
import java.util.List;

public interface TestRepo {
    Test create(Test test);

    Test update(Test test);

    void update(Long testId, String name, String description, String content, String answer, Date dateTimeStart,
                Date dateTimeEnd, List<String> fieldList);

    Test getById(Long lessonId);

    List<Test> search(Long testId, Long courseId, String name, String description, String content, String answer,
                      Date dateTimeStartFrom, Date dateTimeStartTo, Date dateTimeEndFrom, Date dateTimeEndTo,
                      Date createdAtFrom, Date createdAtTo, Date updatedAtFrom, Date updatedAtTo, List<String> fieldList);

    void archive(Long testId);

    void recover(Long testId);

}
