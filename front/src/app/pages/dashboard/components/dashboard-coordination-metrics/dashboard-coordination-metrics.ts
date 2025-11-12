import { Component, input, InputSignal } from '@angular/core';
import { CoordinationMetrics } from '@/pages/dashboard/entities/coordination-metrics';
import { CoordinationMetric } from '@/pages/dashboard/components/coordination-metric-card/coordination-metric-card';

@Component({
    selector: 'dashboard-coordination-metrics',
    imports: [CoordinationMetric],
    templateUrl: './dashboard-coordination-metrics.html',
    styleUrl: './dashboard-coordination-metrics.scss'
})
export class DashboardCoordinationMetrics {
    public coordinationMetrics: InputSignal<CoordinationMetrics> = input.required<CoordinationMetrics>();
}
