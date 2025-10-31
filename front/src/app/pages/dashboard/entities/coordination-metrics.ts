export interface CoordinationMetrics {
    projectsInGate1: number;
    projectsLateInGate1: number;
    projectsAlmostLateInGate1: number;
    projectsInGate2: number;
    projectsLateInGate2: number;
    projectsAlmostLateInGate2: number;
    projectsInGate3: number;
    projectsLateInGate3: number;
    projectsAlmostLateInGate3: number;
    projectsInGate4: number;
    projectsLateInGate4: number;
    projectsAlmostLateInGate4: number;
    projectsInGate5: number;
    projectsLateInGate5: number;
    projectsAlmostLateInGate5: number;
    lateProjects: number;
    almostLateProjects: number;
    completedProjects: number;
    cancelledProjects: number;
    inProgressProjects: number;
    totalProjects: number;
    meetingsToday: number;
}
