package com.nhatnl.datn.backend.model.idClass;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentTestId implements Serializable {
    private Long studentId;
    private Long testId;
}
