package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.dto.entity.AccountDto;
import com.nhatnl.datn.backend.dto.request.account.SearchReq;
import com.nhatnl.datn.backend.dto.response.teacher.DiscoverTeachersResp;
import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.model.Course;
import com.nhatnl.datn.backend.model.Teacher;
import com.nhatnl.datn.backend.repository.CourseRepo;
import com.nhatnl.datn.backend.repository.TeacherRepo;
import com.nhatnl.datn.backend.service.AccountService;
import com.nhatnl.datn.backend.service.CourseService;
import com.nhatnl.datn.backend.service.TeacherService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService {
    public final AccountService accountService;
    public final CourseRepo courseRepo;
    public final TeacherRepo teacherRepo;

    public TeacherServiceImpl(AccountService accountService, CourseRepo courseRepo, TeacherRepo teacherRepo) {
        this.accountService = accountService;
        this.courseRepo = courseRepo;
        this.teacherRepo = teacherRepo;
    }


    @Override
    public List<DiscoverTeachersResp> discoverTeachers() {
        List<AccountDto> accountDtoList = accountService.search(
                SearchReq.builder()
                        .role(Account.Role.TEACHER)
                        .fieldList(Collections.singletonList("role"))
                        .build()
        );

        List<DiscoverTeachersResp> result = new ArrayList<>();
        for (AccountDto accountDto : accountDtoList) {
            Teacher teacher = accountDto.getTeacher();
            if (!teacher.getIsPublic()) {
                continue;
            }
            if (teacher.getDisplayName() == null || teacher.getDisplayName().isEmpty()) {
                teacher.setDisplayName(accountDto.getFirstName() + " " + accountDto.getLastName());
            }

            List<Course> courseList = courseRepo.search(
                    null,
                    teacher.getTeacherId(),
                    null,
                    null,
                    true,
                    null,
                    null,
                    null,
                    null,
                    Arrays.asList("teacherId", "isPublic")
            );

            result.add(
                    DiscoverTeachersResp.builder()
                            .teacher(teacher)
                            .courseList(courseList)
                            .imageUrl(accountDto.getImageUrl())
                            .build()
            );
        }

        return result;
    }
}
