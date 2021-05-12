package com.nhatnl.datn.backend.dto.request.test;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateReq {
    private Long courseId;
    private String name;
    private String description;
    private String content;
    private String answer;
    private String dateTimeStart;
    private String dateTimeEnd;
}
