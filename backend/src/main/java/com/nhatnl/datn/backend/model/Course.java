package com.nhatnl.datn.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Course")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Course {
    @Id
    @Column(name = "courseId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    @Column(name = "teacherId", nullable = false)
    private Long teacherId;

    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "imageUrl", nullable = false)
    private String imageUrl;

    @Column(name = "code", length = 255, nullable = false)
    private String code;

    @Column(name = "isPublic", nullable = false)
    private Boolean isPublic;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @Column(name = "updatedAt", nullable = false)
    private Date updatedAt;

}
