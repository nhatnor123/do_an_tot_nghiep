package com.nhatnl.datn.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "StudentCourse")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentCourse {
    @Id
    @Column(name = "studentId", nullable = false)
    private Long studentId;

    @Id
    @Column(name = "lessonId", nullable = false)
    private Long courseId;

    @Column(name = "isApproved", nullable = false)
    private Boolean isApproved;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @Column(name = "updatedAt", nullable = false)
    private Date updatedAt;

}
