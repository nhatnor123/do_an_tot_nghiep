package com.nhatnl.datn.backend.dto.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.model.Student;
import com.nhatnl.datn.backend.model.Teacher;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date birthday;
    private Boolean isActive;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy hh:mm:ss")
    private Date createdAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy hh:mm:ss")
    private Date updatedAt;
    private Student student;
    private Teacher teacher;
}
