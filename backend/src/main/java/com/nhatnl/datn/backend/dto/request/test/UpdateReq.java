package com.nhatnl.datn.backend.dto.request.test;

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
public class UpdateReq {
    private Long testId;
    private String name;
    private String description;
    private String content;
    private String answer;
    private String dateTimeStart;
    private String dateTimeEnd;
    private List<String> fieldList;
}
