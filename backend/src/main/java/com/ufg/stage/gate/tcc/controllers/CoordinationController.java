package com.ufg.stage.gate.tcc.controllers;

import com.ufg.stage.gate.tcc.models.dtos.MeetingCoordinationDTO;
import com.ufg.stage.gate.tcc.models.dtos.ProjectGateMetricsDTO;
import com.ufg.stage.gate.tcc.models.dtos.ProjectListDTO;
import com.ufg.stage.gate.tcc.services.CoordinationService;
import com.ufg.stage.gate.tcc.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/coordination")
public class CoordinationController {

    private final CoordinationService coordinationService;
    private final ProjectService projectService;

    public CoordinationController(
            CoordinationService coordinationService,
            ProjectService projectService) {
        this.coordinationService = coordinationService;
        this.projectService = projectService;
    }

    @GetMapping("/projects/metrics")
    public ResponseEntity<ProjectGateMetricsDTO> getProjectGateMetrics() {
        ProjectGateMetricsDTO metrics = coordinationService.getProjectGateMetrics();
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectListDTO>> getAllProjects() {
        List<ProjectListDTO> projects = projectService.listAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/projects/meetings")
    public ResponseEntity<List<MeetingCoordinationDTO>> getAllMeetings() {
        List<MeetingCoordinationDTO> meetings = coordinationService.getAllMeetings();
        return ResponseEntity.ok(meetings);
    }
}
