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
public class SearchReq {
    private Long testId;
    private Long courseId;
    private String name;
    private String description;
    private String content;
    private String answer;
    private Date dateTimeStartFrom;
    private Date dateTimeStartTo;
    private Date dateTimeEndFrom;
    private Date dateTimeEndTo;
    private Date createdAtFrom;
    private Date createdAtTo;
    private Date updatedAtFrom;
    private Date updatedAtTo;
    private List<String> fieldList;
}
