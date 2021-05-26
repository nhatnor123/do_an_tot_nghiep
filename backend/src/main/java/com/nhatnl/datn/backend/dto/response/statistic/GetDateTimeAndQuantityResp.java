package com.nhatnl.datn.backend.dto.response.statistic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class GetDateTimeAndQuantityResp {
    @Id
    private String dateTime;
    private Long quantity;
}
