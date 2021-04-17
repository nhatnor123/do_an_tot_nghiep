package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.dto.request.lesson.*;
import com.nhatnl.datn.backend.model.Course;
import com.nhatnl.datn.backend.model.Lesson;
import com.nhatnl.datn.backend.repository.LessonRepo;
import com.nhatnl.datn.backend.service.AccountService;
import com.nhatnl.datn.backend.service.CourseService;
import com.nhatnl.datn.backend.service.LessonService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonServiceImpl implements LessonService {

    public final AccountService accountService;
    public final CourseService courseService;
    public final LessonRepo lessonRepo;

    public LessonServiceImpl(AccountService accountService, CourseService courseService, LessonRepo lessonRepo) {
        this.accountService = accountService;
        this.courseService = courseService;
        this.lessonRepo = lessonRepo;
    }

    @Override
    public Lesson create(CreateReq req) {
        Course course = courseService.getById(req.getCourseId());

        Lesson lesson = Lesson.builder()
                .course(course)
                .name(req.getName())
                .description(req.getDescription())
                .content(req.getContent())
                .isActive(true)
                .build();

        return lessonRepo.create(lesson);
    }

    @Override
    public Lesson updateLesson(UpdateLessonReq req) {

        lessonRepo.updateLessonInfo(
                req.getLessonId(),
                req.getName(),
                req.getDescription(),
                req.getContent(),
                req.getFieldList()
        );

        return this.getById(req.getLessonId());

    }

    @Override
    public Lesson getById(Long courseId) {
        return lessonRepo.getById(courseId);
    }

    @Override
    public List<Lesson> search(SearchReq req) {
        return lessonRepo.search(
                req.getLessonId(),
                req.getCourseId(),
                req.getName(),
                req.getDescription(),
                req.getContent(),
                req.getCreatedAtFrom(),
                req.getCreatedAtTo(),
                req.getUpdatedAtFrom(),
                req.getUpdatedAtTo(),
                req.getFieldList()
        );
    }

    @Override
    public Lesson archive(Long lessonId) {
        lessonRepo.archive(lessonId);
        return this.getById(lessonId);
    }

}
