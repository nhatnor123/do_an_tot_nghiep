package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.dto.response.dbFile.UploadFileResp;
import com.nhatnl.datn.backend.model.DBFile;
import com.nhatnl.datn.backend.service.DBFileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping(path = "/file")
@Slf4j
public class DBFileController {
    private final DBFileService imageService;

    public DBFileController(DBFileService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        log.info("upload File");
        DBFile dbFile = imageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("file/download    /")
                .path(dbFile.getFileId().toString())
                .toUriString();

        return ResponseEntity.ok(
                UploadFileResp.builder()
                        .fileName(dbFile.getFileName())
                        .fileDownloadUri(fileDownloadUri)
                        .fileType(file.getContentType())
                        .size(file.getSize())
                        .build()
        );
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) {
        log.info("download File");
        // Load file from database
        DBFile image = imageService.getFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getFileName() + "\"")
                .body(new ByteArrayResource(image.getData()));
    }


}
