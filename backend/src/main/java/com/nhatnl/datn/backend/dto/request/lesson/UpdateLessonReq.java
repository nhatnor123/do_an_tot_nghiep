package com.nhatnl.datn.backend.dto.request.lesson;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateLessonReq {
    private Long lessonId;
    private String name;
    private String description;
    private String content;
    private List<String> fieldList;
}
