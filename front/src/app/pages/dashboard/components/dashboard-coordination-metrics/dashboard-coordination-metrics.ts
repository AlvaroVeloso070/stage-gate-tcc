import {Component, inject, input, InputSignal} from '@angular/core';
import { CoordinationMetrics } from '@/pages/dashboard/entities/coordination-metrics';
import { CoordinationMetric } from '@/pages/dashboard/components/coordination-metric-card/coordination-metric-card';
import {Router} from "@angular/router";
import {ProjectFilterEnum} from "@/pages/projects/entities/ProjectFilterEnum";

@Component({
    selector: 'dashboard-coordination-metrics',
    imports: [CoordinationMetric],
    templateUrl: './dashboard-coordination-metrics.html',
    styleUrl: './dashboard-coordination-metrics.scss'
})
export class DashboardCoordinationMetrics {

    private router : Router = inject(Router);

    public coordinationMetrics: InputSignal<CoordinationMetrics> = input.required<CoordinationMetrics>();

    public consultTodayMeetings = () => {
        this.router.navigate(['/pages/meetings'], {queryParams: {filter: 'TODAY'}});
    }

    public consultInProgressProjects= () =>  {
        this.router.navigate(['/pages/projects'], {queryParams: {filter: ProjectFilterEnum.IN_PROGRESS}});
    }

    public consultAlmostLateProjects= () =>  {
        this.router.navigate(['/pages/projects'], {queryParams: {filter: ProjectFilterEnum.ALMOST_LATE}});
    }

    public consultLateProjects = () =>  {
        this.router.navigate(['/pages/projects'], {queryParams: {filter: ProjectFilterEnum.LATE}});
    }
}
