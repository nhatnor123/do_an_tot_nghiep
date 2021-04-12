package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.model.DBFile;
import com.nhatnl.datn.backend.repository.DBFileRepo;
import com.nhatnl.datn.backend.service.DBFileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Slf4j
public class DBFileServiceImpl implements DBFileService {
    public final DBFileRepo imageRepo;

    public DBFileServiceImpl(DBFileRepo imageRepo) {
        this.imageRepo = imageRepo;
    }

    @Override
    public DBFile storeFile(MultipartFile file) throws IOException {
        DBFile imageFile = DBFile.builder()
                .fileName(file.getOriginalFilename())
                .fileType(file.getContentType())
                .data(file.getBytes())
                .build();
        return imageRepo.save(imageFile);
    }

    @Override
    public DBFile getFile(Long fileId) {
        return imageRepo.findById(fileId).orElse(null);
    }
}
