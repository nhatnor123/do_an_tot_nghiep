package com.nhatnl.datn.backend.dto.request.comment;

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
    private Long commentId;
    private Long commentParentId;
    private Long lessonId;
    private Long accountId;
    private String content;
    private Date createdAtFrom;
    private Date createdAtTo;
    private Date updatedAtFrom;
    private Date updatedAtTo;
    private List<String> fieldList;
}
