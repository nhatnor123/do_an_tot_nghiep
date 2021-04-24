package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.dto.response.teacher.DiscoverTeachersResp;

import java.util.List;

public interface TeacherService {
    List<DiscoverTeachersResp> discoverTeachers();

}
