package com.nhatnl.datn.backend.dto.response.course;

import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.model.Course;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseAndTeacher {
    private Account account;
    private Course course;
}
