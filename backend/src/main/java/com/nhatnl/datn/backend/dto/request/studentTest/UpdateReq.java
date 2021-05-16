package com.nhatnl.datn.backend.dto.request.studentTest;

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
    private Long testId;
    private String score;
    private String feedback;
    private List<String> fieldList;
}
