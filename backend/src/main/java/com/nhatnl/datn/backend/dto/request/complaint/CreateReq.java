package com.nhatnl.datn.backend.dto.request.complaint;

import com.nhatnl.datn.backend.model.Complaint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateReq {
    private String name;
    private String content;
    private Complaint.ComplaintType type;
    private Long fromAccountId;
    private Long toAccountId;

}
