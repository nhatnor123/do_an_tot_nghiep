package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.dto.request.studentTest.*;
import com.nhatnl.datn.backend.dto.response.studentTest.GetOfStudentByIdResp;
import com.nhatnl.datn.backend.model.StudentTest;
import com.nhatnl.datn.backend.repository.StudentTestRepo;
import com.nhatnl.datn.backend.service.AccountService;
import com.nhatnl.datn.backend.service.StudentTestService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class StudentTestServiceImpl implements StudentTestService {
    public final StudentTestRepo studentTestRepo;
    private final AccountService accountService;

    public StudentTestServiceImpl(StudentTestRepo studentTestRepo, AccountService accountService) {
        this.studentTestRepo = studentTestRepo;
        this.accountService = accountService;
    }

    @Override
    public StudentTest create(CreateReq req) {
        Long studentId = accountService.getSelfAccount().getStudent().getStudentId();
        StudentTest studentTest = StudentTest.builder()
                .studentId(studentId)
                .testId(req.getTestId())
                .content(req.getContent())
                .score(req.getScore())
                .feedback(" ")
                .doAt(new Date())
                .feedbackAt(new Date())
                .build();

        return studentTestRepo.create(studentTest);
    }

    @Override
    public StudentTest update(UpdateReq req) {

        studentTestRepo.update(
                req.getStudentId(),
                req.getTestId(),
                req.getScore(),
                req.getFeedback(),
                new Date(),
                req.getFieldList()
        );

        return this.getById(req.getStudentId(), req.getTestId());

    }

    @Override
    public StudentTest getById(Long studentId, Long testId) {
        return studentTestRepo.getById(studentId, testId);
    }

    @Override
    public GetOfStudentByIdResp getOfStudentById(Long testId) {
        Long studentId = accountService.getSelfAccount().getStudent().getStudentId();
        StudentTest studentTest = studentTestRepo.getById(studentId, testId);
        return GetOfStudentByIdResp.builder()
                .isExisted(studentTest != null)
                .studentTest(studentTest)
                .build();
    }

    @Override
    public List<StudentTest> search(SearchReq req) {
        return studentTestRepo.search(
                req.getStudentId(),
                req.getTestId(),
                req.getContent(),
                req.getScore(),
                req.getFeedback(),
                req.getDoAtFrom(),
                req.getDoAtTo(),
                req.getFeedbackAtFrom(),
                req.getFeedbackAtTo(),
                req.getFieldList()
        );
    }

}
