package com.nhatnl.datn.backend.dto.response.studentCourse;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetStudentsJoiningCourseResp {
    private List<StudentJoiningCourseInfoDto> students;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class StudentJoiningCourseInfoDto {
        private Long studentId;
        private String username;
        private String email;
        private String displayName;
        private String firstName;
        private String lastName;
        private Boolean isApproved;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy hh:mm:ss")
        public Date createdAt;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy hh:mm:ss")
        public Date updatedAt;
    }


}
