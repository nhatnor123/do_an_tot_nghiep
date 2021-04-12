package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.model.DBFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DBFileService {
    DBFile storeFile(MultipartFile file) throws IOException;

    DBFile getFile(Long fileId);
}
