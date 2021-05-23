package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.dto.request.complaint.*;
import com.nhatnl.datn.backend.model.Complaint;
import com.nhatnl.datn.backend.repository.ComplaintRepo;
import com.nhatnl.datn.backend.service.AccountService;
import com.nhatnl.datn.backend.service.ComplaintService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    public final AccountService accountService;
    public final ComplaintRepo complaintRepo;

    public ComplaintServiceImpl(AccountService accountService, ComplaintRepo complaintRepo) {
        this.accountService = accountService;
        this.complaintRepo = complaintRepo;
    }

    @Override
    public Complaint create(CreateReq req) {

        Complaint test = Complaint.builder()
                .name(req.getName())
                .content(req.getContent())
                .replyContent(null)
                .type(req.getType())
                .fromAccountId(req.getFromAccountId())
                .toAccountId(req.getType() == Complaint.ComplaintType.STUDENT_TO_TEACHER ? req.getToAccountId() : null)
                .isActive(true)
                .build();

        return complaintRepo.create(test);
    }

    @Override
    public Complaint update(UpdateReq req) {

        complaintRepo.update(
                req.getComplaintId(),
                req.getReplyContent()
        );

        return this.getById(req.getComplaintId());

    }

    @Override
    public Complaint getById(Long courseId) {
        return complaintRepo.getById(courseId);
    }

    @Override
    public List<Complaint> search(SearchReq req) {
        return complaintRepo.search(
                req.getComplaintId(),
                req.getName(),
                req.getContent(),
                req.getReplyContent(),
                req.getType(),
                req.getFromAccountId(),
                req.getToAccountId(),
                req.getCreatedAtFrom(),
                req.getCreatedAtTo(),
                req.getUpdatedAtFrom(),
                req.getUpdatedAtTo(),
                req.getFieldList()
        );
    }

    @Override
    public Complaint archive(Long complaintId) {
        complaintRepo.archive(complaintId);
        return this.getById(complaintId);
    }

}
