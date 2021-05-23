package com.nhatnl.datn.backend.dto.request.complaint;

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
    private Long complaintId;
    private String name;
    private String content;
    private String replyContent;
    private String type;
    private Long fromAccountId;
    private Long toAccountId;
    private Date createdAtFrom;
    private Date createdAtTo;
    private Date updatedAtFrom;
    private Date updatedAtTo;
    private List<String> fieldList;
}
