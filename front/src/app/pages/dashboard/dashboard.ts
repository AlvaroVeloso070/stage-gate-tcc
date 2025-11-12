import { Component, inject, OnInit } from '@angular/core';
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
import { CoordinationService } from '@/services/coordination.service';

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
export class Dashboard implements OnInit{

    private readonly coordinationService : CoordinationService = inject(CoordinationService);

    protected coordinationMetrics !: CoordinationMetrics;
    protected isLoading : boolean = true;

    ngOnInit(): void {
        this.coordinationService.getCoordinationMetrics().subscribe(metrics => {
            this.coordinationMetrics = metrics;
            this.isLoading = false;
        })
    }
}
