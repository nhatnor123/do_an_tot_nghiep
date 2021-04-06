package com.nhatnl.datn.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Comment")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment {
    @Id
    @Column(name = "commentId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(name = "commentParentId", nullable = false)
    private Long commentParentId;

    @Column(name = "lessonId", nullable = false)
    private Long lessonId;

    @Column(name = "accountId", nullable = false)
    private Long accountId;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @Column(name = "updatedAt", nullable = false)
    private Date updatedAt;

}
