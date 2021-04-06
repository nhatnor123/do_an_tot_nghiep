package com.nhatnl.datn.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Student")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Student {
    @Id
    @Column(name = "studentId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    @Column(name = "accountId", nullable = false)
    private Long accountId;

    @Column(name = "displayName", length = 255, nullable = false)
    private String displayName;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @Column(name = "updatedAt", nullable = false)
    private Date updatedAt;

}
