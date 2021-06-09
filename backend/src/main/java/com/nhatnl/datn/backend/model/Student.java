package com.nhatnl.datn.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.nhatnl.datn.backend.util.CustomDateSerializer;
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

    @Column(name = "displayName", length = 255, nullable = true)
    private String displayName;

    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @JsonSerialize(using = CustomDateSerializer.class)
    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @JsonSerialize(using = CustomDateSerializer.class)
    @Column(name = "updatedAt")
    private Date updatedAt;

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "accountId", nullable = false, insertable = false, updatable = false)
    @JsonIgnore
    private Account account;

}
