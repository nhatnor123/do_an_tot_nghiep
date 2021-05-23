package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.dto.request.complaint.*;
import com.nhatnl.datn.backend.model.Complaint;

import java.util.List;

public interface ComplaintService {

    Complaint create(CreateReq req);

    Complaint update(UpdateReq req);

    Complaint getById(Long testId);

    List<Complaint> search(SearchReq req);

    Complaint archive(Long testId);

}
