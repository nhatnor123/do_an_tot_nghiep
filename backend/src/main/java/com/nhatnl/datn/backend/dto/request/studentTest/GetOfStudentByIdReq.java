package com.nhatnl.datn.backend.dto.request.studentTest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetOfStudentByIdReq {
    private Long testId;
}
