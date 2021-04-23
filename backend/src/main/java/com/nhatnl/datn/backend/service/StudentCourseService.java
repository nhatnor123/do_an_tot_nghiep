package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.dto.response.studentCourse.GetStudentsJoiningCourseResp;
import com.nhatnl.datn.backend.dto.response.studentCourse.GetStudentsNotJoinCourseResp;
import com.nhatnl.datn.backend.model.StudentCourse;
import com.nhatnl.datn.backend.dto.request.studentCourse.*;

import java.util.List;

public interface StudentCourseService {

    List<StudentCourse> create(CreateReq req);

    StudentCourse update(UpdateReq req);

    StudentCourse getById(Long studentId, Long courseId);

    List<StudentCourse> search(SearchReq req);

    StudentCourse archive(Long studentId, Long courseId);

    StudentCourse leaveCourse(Long courseId);

    GetStudentsNotJoinCourseResp getStudentsNotJoinCourse(Long courseId);

    GetStudentsJoiningCourseResp getStudentsJoiningCourse(Long courseId);

}
