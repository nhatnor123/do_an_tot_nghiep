package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.dto.request.test.*;
import com.nhatnl.datn.backend.model.Course;
import com.nhatnl.datn.backend.model.Test;
import com.nhatnl.datn.backend.repository.TestRepo;
import com.nhatnl.datn.backend.service.AccountService;
import com.nhatnl.datn.backend.service.CourseService;
import com.nhatnl.datn.backend.service.TestService;
import com.nhatnl.datn.backend.util.DateTimeUtil;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public class TestServiceImpl implements TestService {

    public final AccountService accountService;
    public final CourseService courseService;
    public final TestRepo testRepo;

    public TestServiceImpl(AccountService accountService, CourseService courseService, TestRepo testRepo) {
        this.accountService = accountService;
        this.courseService = courseService;
        this.testRepo = testRepo;
    }

    @Override
    public Test create(CreateReq req) throws ParseException {

        Test test = Test.builder()
                .courseId(req.getCourseId())
                .name(req.getName())
                .description(req.getDescription())
                .content(req.getContent())
                .answer(req.getAnswer())
                .dateTimeStart(DateTimeUtil.parseISODate(req.getDateTimeStart()))
                .dateTimeEnd(DateTimeUtil.parseISODate(req.getDateTimeEnd()))
                .isActive(true)
                .build();

        return testRepo.create(test);
    }

    @Override
    public Test update(UpdateReq req) throws ParseException {

        testRepo.update(
                req.getTestId(),
                req.getName(),
                req.getDescription(),
                req.getContent(),
                req.getAnswer(),
                DateTimeUtil.parseISODate(req.getDateTimeStart()),
                DateTimeUtil.parseISODate(req.getDateTimeEnd()),
                req.getFieldList()
        );

        return this.getById(req.getTestId());

    }

    @Override
    public Test getById(Long courseId) {
        return testRepo.getById(courseId);
    }

    @Override
    public List<Test> search(SearchReq req) {
        return testRepo.search(
                req.getTestId(),
                req.getCourseId(),
                req.getName(),
                req.getDescription(),
                req.getContent(),
                req.getAnswer(),
                req.getDateTimeStartFrom(),
                req.getDateTimeStartTo(),
                req.getDateTimeEndFrom(),
                req.getDateTimeEndTo(),
                req.getCreatedAtFrom(),
                req.getCreatedAtTo(),
                req.getUpdatedAtFrom(),
                req.getUpdatedAtTo(),
                req.getFieldList()
        );
    }

    @Override
    public Test archive(Long testId) {
        testRepo.archive(testId);
        return this.getById(testId);
    }

}
