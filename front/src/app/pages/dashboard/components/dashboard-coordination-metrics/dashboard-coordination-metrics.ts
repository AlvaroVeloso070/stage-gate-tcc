import {Component, input, InputSignal} from '@angular/core';
import {CoordinationMetrics} from "@/pages/dashboard/entities/coordination-metrics";

@Component({
  selector: 'dashboard-coordination-metrics',
  imports: [],
  templateUrl: './dashboard-coordination-metrics.html',
  styleUrl: './dashboard-coordination-metrics.scss'
})
export class DashboardCoordinationMetrics {

    public coordinationMetrics : InputSignal<CoordinationMetrics> = input.required<CoordinationMetrics>();
}
