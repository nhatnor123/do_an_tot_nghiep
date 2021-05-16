package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.model.StudentTest;

import java.util.Date;
import java.util.List;

public interface StudentTestRepo {
    StudentTest create(StudentTest studentTest);

    StudentTest update(StudentTest studentTest);

    void update(Long studentId, Long testId, String score, String feedback, Date feedbackAt, List<String> fieldList);

    StudentTest getById(Long studentId, Long testId);

    List<StudentTest> search(Long studentId, Long testId, String content, String score, String feedback,
                             Date doAtFrom, Date doAtTo, Date feedbackAtFrom, Date feedbackAtTo, List<String> fieldList);


}
