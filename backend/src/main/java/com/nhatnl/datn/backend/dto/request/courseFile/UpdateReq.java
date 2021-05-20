package com.nhatnl.datn.backend.dto.request.courseFile;

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
    private Long courseFileId;
    private String link;
    private String name;
    private String description;
    private List<String> fieldList;
}
