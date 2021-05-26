package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.dto.response.statistic.CommonStatistic;
import com.nhatnl.datn.backend.dto.response.statistic.GetSystemStatisticsResp;
import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.service.*;
import org.springframework.stereotype.Service;

@Service
public class StatisticServiceImpl implements StatisticService {
    private final AccountService accountService;
    private final CourseService courseService;
    private final LessonService lessonService;
    private final TestService testService;
    private final CommentService commentService;
    private final CourseFileService courseFileService;
    private final ComplaintService complaintService;

    public StatisticServiceImpl(AccountService accountService, CourseService courseService, LessonService lessonService,
                                TestService testService, CommentService commentService, CourseFileService courseFileService,
                                ComplaintService complaintService) {
        this.accountService = accountService;
        this.courseService = courseService;
        this.lessonService = lessonService;
        this.testService = testService;
        this.commentService = commentService;
        this.courseFileService = courseFileService;
        this.complaintService = complaintService;
    }

    @Override
    public GetSystemStatisticsResp getSystemStatistics() {
        CommonStatistic adminStatistics = accountService.getStatisticByRole(Account.Role.ADMIN);
        CommonStatistic teacherStatistics = accountService.getStatisticByRole(Account.Role.TEACHER);
        CommonStatistic studentStatistics = accountService.getStatisticByRole(Account.Role.STUDENT);
        CommonStatistic courseStatistics = courseService.getStatistic();
        CommonStatistic lessonStatistics = lessonService.getStatistic();
        CommonStatistic testStatistics = testService.getStatistic();
        CommonStatistic commentStatistics = commentService.getStatistic();
        CommonStatistic courseFileStatistics = courseFileService.getStatistic();
        CommonStatistic complaintStatistics = complaintService.getStatistic();

        return GetSystemStatisticsResp.builder()
                .admin(adminStatistics)
                .teacher(teacherStatistics)
                .student(studentStatistics)
                .course(courseStatistics)
                .lesson(lessonStatistics)
                .test(testStatistics)
                .comment(commentStatistics)
                .courseFile(courseFileStatistics)
                .complaint(complaintStatistics)
                .build();
    }
}
