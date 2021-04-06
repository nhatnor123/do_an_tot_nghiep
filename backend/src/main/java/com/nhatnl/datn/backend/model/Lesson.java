package com.nhatnl.datn.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Lesson")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Lesson {
    @Id
    @Column(name = "lessonId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lessonId;

    @Column(name = "courseId", nullable = false)
    private Long courseId;

    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @Column(name = "updatedAt", nullable = false)
    private Date updatedAt;

}
