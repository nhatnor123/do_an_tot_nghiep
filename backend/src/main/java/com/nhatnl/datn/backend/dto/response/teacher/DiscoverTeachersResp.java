package com.nhatnl.datn.backend.dto.response.teacher;

import com.nhatnl.datn.backend.model.Course;
import com.nhatnl.datn.backend.model.Teacher;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiscoverTeachersResp {
    public Teacher teacher;
    public List<Course> courseList;
    public String imageUrl;
}
