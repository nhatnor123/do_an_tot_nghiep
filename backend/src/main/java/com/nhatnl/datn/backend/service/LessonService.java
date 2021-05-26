package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.dto.request.lesson.CreateReq;
import com.nhatnl.datn.backend.dto.request.lesson.SearchReq;
import com.nhatnl.datn.backend.dto.request.lesson.UpdateLessonReq;
import com.nhatnl.datn.backend.dto.response.statistic.CommonStatistic;
import com.nhatnl.datn.backend.model.Lesson;

import java.util.List;

public interface LessonService {

    Lesson create(CreateReq req);

    Lesson updateLesson(UpdateLessonReq req);

    Lesson getById(Long lessonId);

    List<Lesson> search(SearchReq req);

    Lesson archive(Long lessonId);

    CommonStatistic getStatistic();

}
