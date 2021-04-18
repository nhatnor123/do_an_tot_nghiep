package com.nhatnl.datn.backend.dto.request.studentCourse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateReq {
    private Long studentId;
    private Long courseId;
    private Boolean isApproved;
}
