package com.nhatnl.datn.backend.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Account")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account {
    @Id
    @Column(name = "accountId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(name = "username", length = 255, nullable = false, unique = true)
    private String username;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Column(name = "email", length = 255, nullable = false, unique = true)
    private String email;

    @Column(name = "firstName", length = 255, nullable = false)
    private String firstName;

    @Column(name = "lastName", length = 255, nullable = false)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", length = 10, nullable = false)
    private Role role;

    @Column(name = "phoneNo", length = 15, nullable = false)
    private String phoneNo;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "imageUrl", nullable = false)
    private String imageUrl;

    @Column(name = "birthday", nullable = false)
    private Date birthday;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @Column(name = "updatedAt", nullable = false)
    private Date updatedAt;

    public enum Role {
        ADMIN,
        TEACHER,
        STUDENT
    }

}
