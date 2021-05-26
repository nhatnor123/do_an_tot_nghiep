package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.dto.response.statistic.GetDateTimeAndQuantityResp;
import com.nhatnl.datn.backend.dto.response.statistic.GetTotalNumberResp;
import com.nhatnl.datn.backend.model.Complaint;

import java.util.Date;
import java.util.List;

public interface ComplaintRepo {
    Complaint create(Complaint complaint);

    Complaint update(Complaint complaint);

    void update(Long complaintId, String replyContent);

    Complaint getById(Long complaintId);

    List<Complaint> search(Long complaintId, String name, String content, String replyContent, List<String> type, Long fromAccountId,
                           Long toAccountId, Date createdAtFrom, Date createdAtTo, Date updatedAtFrom, Date updatedAtTo, List<String> fieldList);

    void archive(Long complaintId);

    void recover(Long complaintId);

    GetTotalNumberResp getTotalActive();

    List<GetDateTimeAndQuantityResp> getDetailStatistic();

}
