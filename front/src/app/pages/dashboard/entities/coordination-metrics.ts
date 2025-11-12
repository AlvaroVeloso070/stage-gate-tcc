export interface CoordinationMetrics {
    projectsInGate1: number;
    projectsInGate2: number;
    projectsInGate3: number;
    projectsInGate4: number;
    projectsInGate5: number;
    projectsInGate6: number;

    lateProjectsInGate1: number;
    lateProjectsInGate2: number;
    lateProjectsInGate3: number;
    lateProjectsInGate4: number;
    lateProjectsInGate5: number;
    lateProjectsInGate6: number;
    lateProjects: number;

    almostLateProjectsInGate1: number;
    almostLateProjectsInGate2: number;
    almostLateProjectsInGate3: number;
    almostLateProjectsInGate4: number;
    almostLateProjectsInGate5: number;
    almostLateProjectsInGate6: number;
    almostLateProjects: number;

    completedProjects: number;
    cancelledProjects: number;
    inProgressProjects: number;
    totalProjects: number;

    meetingsToday : number;
}
