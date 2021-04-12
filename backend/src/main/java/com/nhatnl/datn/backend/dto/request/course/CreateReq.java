package com.nhatnl.datn.backend.dto.request.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateReq {
    private String name;
    private String description;
    private String imageUrl;
    private Boolean isPublic;
}
