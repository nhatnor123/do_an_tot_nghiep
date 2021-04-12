package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.dto.entity.AccountDto;
import com.nhatnl.datn.backend.dto.request.course.CreateReq;
import com.nhatnl.datn.backend.dto.request.course.SearchReq;
import com.nhatnl.datn.backend.dto.request.course.UpdateCourseInfoReq;
import com.nhatnl.datn.backend.model.Course;
import com.nhatnl.datn.backend.repository.CourseRepo;
import com.nhatnl.datn.backend.service.AccountService;
import com.nhatnl.datn.backend.service.CourseService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    public final AccountService accountService;
    public final CourseRepo courseRepo;

    public static final int COURSE_CODE_LENGTH = 9;

    public CourseServiceImpl(AccountService accountService, CourseRepo courseRepo) {
        this.accountService = accountService;
        this.courseRepo = courseRepo;
    }

    @Override
    public Course create(CreateReq req) {
        AccountDto accountDto = accountService.getSelfAccount();

        Course course = Course.builder()
                .teacher(accountDto.getTeacher())
                .name(req.getName())
                .description(req.getDescription())
                .imageUrl(req.getImageUrl())
                .code(RandomStringUtils.randomAlphanumeric(COURSE_CODE_LENGTH))
                .isPublic(req.getIsPublic())
                .isActive(true)
                .build();

        return courseRepo.create(course);
    }

    @Override
    public Course updateCourseInfo(UpdateCourseInfoReq req) {
        Long currentTeacherId = accountService.getSelfAccount().getTeacher().getTeacherId();

        courseRepo.updateCourseInfo(
                req.getCourseId(),
                currentTeacherId,
                req.getName(),
                req.getDescription(),
                req.getImageUrl(),
                RandomStringUtils.randomAlphanumeric(COURSE_CODE_LENGTH),
                req.getIsPublic(),
                req.getFieldList()
        );

        return this.getByIdAndTeacherId(req.getCourseId(), currentTeacherId);

    }

    @Override
    public Course getById(Long courseId) {
        Long currentTeacherId = accountService.getSelfAccount().getTeacher().getTeacherId();
        return this.getByIdAndTeacherId(courseId, currentTeacherId);
    }

    @Override
    public Course getByIdAndTeacherId(Long courseId, Long teacherId) {
        return courseRepo.getByIdAndTeacherId(courseId, teacherId);
    }

    @Override
    public List<Course> search(SearchReq req) {

        return courseRepo.search(
                req.getCourseId(),
                accountService.getSelfAccount().getTeacher().getTeacherId(),
                req.getName(),
                req.getDescription(),
                req.getIsPublic(),
                req.getIsActive(),
                req.getCreatedAtFrom(),
                req.getCreatedAtTo(),
                req.getUpdatedAtFrom(),
                req.getUpdatedAtTo(),
                req.getFieldList()
        );
    }

    @Override
    public Course archive(Long courseId) {
        Long currentTeacherId = accountService.getSelfAccount().getTeacher().getTeacherId();
        courseRepo.archive(courseId, currentTeacherId);
        return getByIdAndTeacherId(courseId, currentTeacherId);
    }

}
