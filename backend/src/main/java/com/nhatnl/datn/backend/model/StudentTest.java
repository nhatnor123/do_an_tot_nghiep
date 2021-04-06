package com.nhatnl.datn.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "StudentTest")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentTest {
    @Id
    @Column(name = "studentId", nullable = false)
    private Long studentId;

    @Id
    @Column(name = "testId", nullable = false)
    private Long testId;

    @Column(name = "score", length = 255, nullable = false)
    private String score;

    @Column(name = "feedback", nullable = false)
    private String feedback;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "doAt", nullable = false)
    private Date doAt;

    @Column(name = "feedbackAt", nullable = false)
    private Date feedbackAt;

}
