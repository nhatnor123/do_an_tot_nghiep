package com.nhatnl.datn.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Complaint")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Complaint {
    @Id
    @Column(name = "complaintId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long complaintId;

    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "replyContent")
    private String replyContent;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ComplaintType type;

    @Column(name = "fromAccountId", nullable = false)
    private Long fromAccountId;

    @Column(name = "toAccountId")
    private Long toAccountId;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @Column(name = "updatedAt", nullable = false)
    private Date updatedAt;

    public enum ComplaintType {
        STUDENT_TO_TEACHER,
        STUDENT_TO_ADMIN,
        TEACHER_TO_ADMIN
    }

}
