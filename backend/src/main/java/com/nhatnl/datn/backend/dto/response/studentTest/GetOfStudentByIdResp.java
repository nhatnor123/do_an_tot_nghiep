package com.nhatnl.datn.backend.dto.response.studentTest;

import com.nhatnl.datn.backend.model.StudentTest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetOfStudentByIdResp {
    private Boolean isExisted;
    private StudentTest studentTest;
}
