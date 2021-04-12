package com.nhatnl.datn.backend.dto.request.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateCourseInfoReq {
    private Long courseId;
    private String name;
    private String description;
    private String imageUrl;
    private Boolean isPublic;
    private List<String> fieldList;
}
