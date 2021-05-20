package com.nhatnl.datn.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "CourseFile")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseFile {
    @Id
    @Column(name = "courseFileId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseFileId;

    @Column(name = "courseId", nullable = false)
    private Long courseId;

    @Column(name = "link", nullable = false)
    private String link;

    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @Column(name = "updatedAt", nullable = false)
    private Date updatedAt;

}
