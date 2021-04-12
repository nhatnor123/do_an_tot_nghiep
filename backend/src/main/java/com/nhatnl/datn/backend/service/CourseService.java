package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.dto.request.course.CreateReq;
import com.nhatnl.datn.backend.dto.request.course.SearchReq;
import com.nhatnl.datn.backend.dto.request.course.UpdateCourseInfoReq;
import com.nhatnl.datn.backend.model.Course;

import java.util.List;

public interface CourseService {

    Course create(CreateReq req);

    Course updateCourseInfo(UpdateCourseInfoReq req);

    Course getById(Long courseId);

    Course getByIdAndTeacherId(Long courseId, Long teacherId);

    List<Course> search(SearchReq req);

    Course archive(Long courseId);

}
