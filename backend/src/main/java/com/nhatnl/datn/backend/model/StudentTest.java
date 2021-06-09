package com.nhatnl.datn.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.nhatnl.datn.backend.model.idClass.StudentTestId;
import com.nhatnl.datn.backend.util.CustomDateSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "StudentTest")
@IdClass(StudentTestId.class)
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

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "score", length = 255, nullable = false)
    private String score;

    @Column(name = "feedback", nullable = false)
    private String feedback;

    @JsonSerialize(using = CustomDateSerializer.class)
    @Column(name = "doAt", nullable = false)
    private Date doAt;

    @JsonSerialize(using = CustomDateSerializer.class)
    @Column(name = "feedbackAt")
    private Date feedbackAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "testId", nullable = false, insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Test test;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "studentId", nullable = false, insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Student student;


}
