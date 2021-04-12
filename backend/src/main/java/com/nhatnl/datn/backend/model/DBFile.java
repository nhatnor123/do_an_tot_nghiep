package com.nhatnl.datn.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "Image")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DBFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    @Column(name = "fileName", length = 255, nullable = false)
    private String fileName;

    @Column(name = "fileType", length = 255, nullable = false)
    private String fileType;

    @Lob
    @Column(name = "data")
    private byte[] data;

}