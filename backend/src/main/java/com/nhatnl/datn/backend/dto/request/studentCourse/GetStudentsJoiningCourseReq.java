package com.nhatnl.datn.backend.dto.request.studentCourse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetStudentsJoiningCourseReq {
    private Long courseId;
}
