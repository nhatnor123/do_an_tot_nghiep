package com.nhatnl.datn.backend.dto.request.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateReq {
    private Long commentParentId;
    private Long lessonId;
    private Long accountId;
    private String content;
}
