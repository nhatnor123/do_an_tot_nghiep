package com.nhatnl.datn.backend.dto.response.statistic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommonStatistic {
    private Long total;
    private List<GetDateTimeAndQuantityResp> detail;
}
