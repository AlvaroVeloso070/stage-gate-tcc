import {Component, inject, input, InputSignal, OnDestroy, OnInit} from '@angular/core';
import {UIChart} from "primeng/chart";
import {LayoutService} from "@/layout/service/layout.service";
import {debounceTime, Subscription} from "rxjs";
import {ChartData, ChartOptions} from "chart.js";
import {CoordinationMetrics} from "@/pages/dashboard/entities/coordination-metrics";

@Component({
  selector: 'dashboard-chart-projects-status',
    imports: [
        UIChart
    ],
  templateUrl: './dashboard-chart-projects-status.html',
  styleUrl: './dashboard-chart-projects-status.scss'
})
export class DashboardChartProjectsStatus implements OnInit, OnDestroy {

    private layoutService: LayoutService = inject(LayoutService);
    private readonly subscription!: Subscription;
    protected chartData!: ChartData;
    protected chartOptions!: ChartOptions;

    public coordinationMetrics : InputSignal<CoordinationMetrics> = input.required<CoordinationMetrics>();

    constructor() {
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const borderColor = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['Em Andamento', 'Concluídos', 'Cancelados'],
            datasets: [
                {
                    data: [this.coordinationMetrics().inProgressProjects, this.coordinationMetrics().completedProjects, this.coordinationMetrics().cancelledProjects],
                    backgroundColor: [documentStyle.getPropertyValue('--p-primary-400'), documentStyle.getPropertyValue('--p-primary-600'), documentStyle.getPropertyValue('--p-primary-200')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--p-primary-300'), documentStyle.getPropertyValue('--p-primary-500'), documentStyle.getPropertyValue('--p-primary-100')],
                    borderColor: borderColor
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
