package com.nhatnl.datn.backend.dto.response.studentCourse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetStudentsNotJoinCourseResp {
    private List<StudentInfoDto> students;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class StudentInfoDto {
        private Long studentId;
        private String username;
        private String email;
        private String displayName;
        private String firstName;
        private String lastName;
    }


}
