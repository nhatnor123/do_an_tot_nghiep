package com.nhatnl.datn.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Teacher")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Teacher {
    @Id
    @Column(name = "teacherId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teacherId;

    @Column(name = "accountId", nullable = false)
    private Long accountId;

    @Column(name = "displayName", length = 255, nullable = false)
    private String displayName;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "isPublic", nullable = false)
    private Boolean isPublic;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @Column(name = "updatedAt", nullable = false)
    private Date updatedAt;

}
