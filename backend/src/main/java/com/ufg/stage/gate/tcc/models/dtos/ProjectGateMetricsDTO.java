package com.ufg.stage.gate.tcc.models.dtos;

import lombok.Data;

@Data
public class ProjectGateMetricsDTO {
    private long projectsInGate1 = 0;
    private long projectsInGate2 = 0;
    private long projectsInGate3 = 0;
    private long projectsInGate4 = 0;
    private long projectsInGate5 = 0;
    private long projectsInGate6 = 0;
    private long lateProjects = 0;
    private long almostLateProjects = 0;
    private long completedProjects = 0;
    private long cancelledProjects = 0;
    private long inProgressProjects = 0;
    private long totalProjects = 0;
}
