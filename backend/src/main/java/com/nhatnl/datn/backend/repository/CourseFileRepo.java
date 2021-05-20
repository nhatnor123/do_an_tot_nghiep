package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.model.CourseFile;

import java.util.Date;
import java.util.List;

public interface CourseFileRepo {
    CourseFile create(CourseFile courseFile);

    CourseFile update(CourseFile courseFile);

    void update(Long courseFileId, String link, String name, String description, List<String> fieldList);

    CourseFile getById(Long courseFileId);

    List<CourseFile> search(Long courseFileId, Long courseId, String name, String description,
                            Date createdAtFrom, Date createdAtTo, Date updatedAtFrom, Date updatedAtTo, List<String> fieldList);

    void archive(Long courseFileId);

    void recover(Long courseFileId);

}
