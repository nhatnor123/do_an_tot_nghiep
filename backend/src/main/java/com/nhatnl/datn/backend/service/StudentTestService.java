package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.dto.request.studentTest.*;
import com.nhatnl.datn.backend.dto.response.studentTest.GetOfStudentByIdResp;
import com.nhatnl.datn.backend.model.StudentTest;

import java.util.List;

public interface StudentTestService {

    StudentTest create(CreateReq req);

    StudentTest update(UpdateReq req);

    StudentTest getById(Long studentId, Long testId);

    GetOfStudentByIdResp getOfStudentById(Long testId);

    List<StudentTest> search(SearchReq req);

}
