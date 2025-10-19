package com.ufg.stage.gate.tcc.controllers;

import com.ufg.stage.gate.tcc.models.dtos.ProjectGateMetricsDTO;
import com.ufg.stage.gate.tcc.services.CoordinationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/coordination")
public class CoordinationController {

    private final CoordinationService coordinationService;

    public CoordinationController(CoordinationService coordinationService) {
        this.coordinationService = coordinationService;
    }

    @GetMapping("/projects/metrics")
    public ResponseEntity<ProjectGateMetricsDTO> getProjectGateMetrics() {
        ProjectGateMetricsDTO metrics = coordinationService.getProjectGateMetrics();
        return ResponseEntity.ok(metrics);
    }
}
