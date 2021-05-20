package com.nhatnl.datn.backend.dto.request.courseFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArchiveReq {
    private Long courseFileId;
}
