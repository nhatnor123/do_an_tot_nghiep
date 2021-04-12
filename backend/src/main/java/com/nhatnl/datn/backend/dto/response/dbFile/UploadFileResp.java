package com.nhatnl.datn.backend.dto.response.dbFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UploadFileResp {
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private Long size;
}
