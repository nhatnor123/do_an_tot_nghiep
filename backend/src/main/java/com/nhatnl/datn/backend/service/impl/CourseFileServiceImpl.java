package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.dto.request.courseFile.*;
import com.nhatnl.datn.backend.dto.response.statistic.CommonStatistic;
import com.nhatnl.datn.backend.dto.response.statistic.GetDateTimeAndQuantityResp;
import com.nhatnl.datn.backend.dto.response.statistic.GetTotalNumberResp;
import com.nhatnl.datn.backend.model.CourseFile;
import com.nhatnl.datn.backend.repository.CourseFileRepo;
import com.nhatnl.datn.backend.service.CourseFileService;
import com.nhatnl.datn.backend.util.DateTimeUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseFileServiceImpl implements CourseFileService {

    public final CourseFileRepo courseFileRepo;

    public CourseFileServiceImpl(CourseFileRepo courseFileRepo) {
        this.courseFileRepo = courseFileRepo;
    }

    @Override
    public CourseFile create(CreateReq req) {

        CourseFile test = CourseFile.builder()
                .courseId(req.getCourseId())
                .link(req.getLink())
                .name(req.getName())
                .description(req.getDescription())
                .isActive(true)
                .build();

        return courseFileRepo.create(test);
    }

    @Override
    public CourseFile update(UpdateReq req) {

        courseFileRepo.update(
                req.getCourseFileId(),
                req.getLink(),
                req.getName(),
                req.getDescription(),
                req.getFieldList()
        );

        return this.getById(req.getCourseFileId());

    }

    @Override
    public CourseFile getById(Long courseFileId) {
        return courseFileRepo.getById(courseFileId);
    }

    @Override
    public List<CourseFile> search(SearchReq req) {
        return courseFileRepo.search(
                req.getCourseFileId(),
                req.getCourseId(),
                req.getName(),
                req.getDescription(),
                req.getCreatedAtFrom(),
                req.getCreatedAtTo(),
                req.getUpdatedAtFrom(),
                req.getUpdatedAtTo(),
                req.getFieldList()
        );
    }

    @Override
    public CourseFile archive(Long courseFileId) {
        courseFileRepo.archive(courseFileId);
        return this.getById(courseFileId);
    }

    @Override
    public CommonStatistic getStatistic() {
        GetTotalNumberResp totalAdmin = courseFileRepo.getTotalActive();
        List<GetDateTimeAndQuantityResp> detailStatistic = courseFileRepo.getDetailStatistic();

        return CommonStatistic.builder()
                .total(totalAdmin.getQuantity())
                .detail(detailStatistic)
                .build();
    }

}
