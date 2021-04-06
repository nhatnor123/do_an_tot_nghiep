package com.nhatnl.datn.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Test")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Test {
    @Id
    @Column(name = "testId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testId;

    @Column(name = "courseId", nullable = false)
    private Long courseId;

    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "answer", nullable = false)
    private String answer;

    @Column(name = "dateTimeStart", nullable = false)
    private Date dateTimeStart;

    @Column(name = "dateTimeEnd", nullable = false)
    private Date dateTimeEnd;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @Column(name = "updatedAt", nullable = false)
    private Date updatedAt;

}
