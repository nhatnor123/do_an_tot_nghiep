package com.nhatnl.datn.backend.dto.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.model.Student;
import com.nhatnl.datn.backend.model.Teacher;
import com.nhatnl.datn.backend.util.CustomDateSerializer;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountDto {
    private Long accountId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Account.Role role;
    private String phoneNo;
    private String address;
    private String imageUrl;
    private Date birthday;
    private Boolean isActive;
    @JsonSerialize(using = CustomDateSerializer.class)
    private Date createdAt;
    @JsonSerialize(using = CustomDateSerializer.class)
    private Date updatedAt;
    private Student student;
    private Teacher teacher;
}
