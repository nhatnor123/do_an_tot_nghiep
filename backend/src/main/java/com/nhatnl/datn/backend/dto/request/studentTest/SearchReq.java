package com.nhatnl.datn.backend.dto.request.studentTest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchReq {
    private Long studentId;
    private Long testId;
    private String content;
    private String score;
    private String feedback;
    private Date doAtFrom;
    private Date doAtTo;
    private Date feedbackAtFrom;
    private Date feedbackAtTo;
    private List<String> fieldList;
}
