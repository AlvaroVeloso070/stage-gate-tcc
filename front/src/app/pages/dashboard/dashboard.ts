import {Component} from '@angular/core';
import {
    DashboardCoordinationMetrics
} from "@/pages/dashboard/components/dashboard-coordination-metrics/dashboard-coordination-metrics";
import {CoordinationMetrics} from "@/pages/dashboard/entities/coordination-metrics";
import {
    DashboardChartProjectsPerGate
} from "@/pages/dashboard/components/dashboard-chart-projects-per-gate/dashboard-chart-projects-per-gate";
import {
    DashboardChartProjectsStatus
} from "@/pages/dashboard/components/dashboard-chart-projects-status/dashboard-chart-projects-status";

@Component({
    selector: 'app-dashboard',
    imports: [
        DashboardCoordinationMetrics,
        DashboardChartProjectsPerGate,
        DashboardChartProjectsStatus
    ],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss'
})
export class Dashboard {

    protected coordinationMetrics : CoordinationMetrics = {
        projectsInGate1: 3,
        projectsLateInGate1: 1,
        projectsAlmostLateInGate1: 2,
        projectsInGate2: 7,
        projectsLateInGate2: 3,
        projectsAlmostLateInGate2: 1,
        projectsInGate3: 15,
        projectsLateInGate3: 0,
        projectsAlmostLateInGate3: 5,
        projectsInGate4: 7,
        projectsLateInGate4: 0,
        projectsAlmostLateInGate4: 0,
        projectsInGate5: 4,
        projectsAlmostLateInGate5: 1,
        projectsLateInGate5: 3,
        lateProjects: 13,
        almostLateProjects: 14,
        completedProjects: 8,
        cancelledProjects: 2,
        inProgressProjects: 40,
        totalProjects: 50
    }
}
