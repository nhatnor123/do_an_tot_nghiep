package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.dto.response.statistic.GetDateTimeAndQuantityResp;
import com.nhatnl.datn.backend.dto.response.statistic.GetTotalNumberResp;
import com.nhatnl.datn.backend.model.Lesson;

import java.util.Date;
import java.util.List;

public interface LessonRepo {
    Lesson create(Lesson lesson);

    Lesson update(Lesson course);

    void updateLessonInfo(Long lessonId, String name, String description, String content, List<String> fieldList);

    Lesson getById(Long lessonId);

    List<Lesson> search(Long lessonId, Long courseId, String name, String description, String content, Date createdAtFrom,
                        Date createdAtTo, Date updatedAtFrom, Date updatedAtTo, List<String> fieldList);

    void archive(Long lessonId);

    void recover(Long lessonId);

    GetTotalNumberResp getTotalActive();

    List<GetDateTimeAndQuantityResp> getDetailStatistic();

}
