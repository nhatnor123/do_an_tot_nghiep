package com.nhatnl.datn.backend.controller;

import com.nhatnl.datn.backend.service.StatisticService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/statistic")
@Slf4j
public class StatisticController {
    public final StatisticService statisticService;

    public StatisticController(StatisticService statisticService) {
        this.statisticService = statisticService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(path = "/get-system-statistics")
    public ResponseEntity<?> getSystemStatistics() {
        log.info("getSystemStatistics");
        return ResponseEntity.ok(statisticService.getSystemStatistics());
    }

}
