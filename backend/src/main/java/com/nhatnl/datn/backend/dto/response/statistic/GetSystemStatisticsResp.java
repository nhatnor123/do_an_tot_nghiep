package com.nhatnl.datn.backend.dto.response.statistic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetSystemStatisticsResp {
    private CommonStatistic admin;
    private CommonStatistic teacher;
    private CommonStatistic student;
    private CommonStatistic course;
    private CommonStatistic lesson;
    private CommonStatistic test;
    private CommonStatistic comment;
    private CommonStatistic courseFile;
    private CommonStatistic complaint;
}
