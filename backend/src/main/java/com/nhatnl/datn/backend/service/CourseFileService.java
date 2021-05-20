package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.dto.request.courseFile.*;
import com.nhatnl.datn.backend.model.CourseFile;

import java.util.List;

public interface CourseFileService {

    CourseFile create(CreateReq req);

    CourseFile update(UpdateReq req);

    CourseFile getById(Long courseFileId);

    List<CourseFile> search(SearchReq req);

    CourseFile archive(Long courseFileId);

}
