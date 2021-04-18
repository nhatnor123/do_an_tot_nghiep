package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.model.StudentCourse;
import com.nhatnl.datn.backend.dto.request.studentCourse.*;

import java.util.List;

public interface StudentCourseService {

    StudentCourse create(CreateReq req);

    StudentCourse update(UpdateReq req);

    StudentCourse getById(Long studentId, Long courseId);

    List<StudentCourse> search(SearchReq req);

    StudentCourse archive(Long studentId, Long courseId);

}
