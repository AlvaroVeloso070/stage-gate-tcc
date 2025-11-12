import {Component, inject, input, InputSignal, OnDestroy, OnInit} from '@angular/core';
import {UIChart} from "primeng/chart";
import {debounceTime, Subscription} from "rxjs";
import {LayoutService} from "@/layout/service/layout.service";
import {ChartData, ChartOptions} from "chart.js";
import {CoordinationMetrics} from "@/pages/dashboard/entities/coordination-metrics";

@Component({
  selector: 'dashboard-chart-projects-per-gate',
    imports: [
        UIChart
    ],
  templateUrl: './dashboard-chart-projects-per-gate.html',
  styleUrl: './dashboard-chart-projects-per-gate.scss'
})
export class DashboardChartProjectsPerGate implements OnInit, OnDestroy {

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
        const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

        this.chartData = {
            labels: ['Gate 1', 'Gate 2', 'Gate 3', 'Gate 4', 'Gate 5', 'Gate 6'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Dentro do prazo',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                    data: [
                        this.coordinationMetrics().projectsInGate1,
                        this.coordinationMetrics().projectsInGate2,
                        this.coordinationMetrics().projectsInGate3,
                        this.coordinationMetrics().projectsInGate4,
                        this.coordinationMetrics().projectsInGate5,
                        this.coordinationMetrics().projectsInGate6
                    ],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Proximo do prazo',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                    data: [
                        this.coordinationMetrics().almostLateProjectsInGate1,
                        this.coordinationMetrics().almostLateProjectsInGate2,
                        this.coordinationMetrics().almostLateProjectsInGate3,
                        this.coordinationMetrics().almostLateProjectsInGate4,
                        this.coordinationMetrics().almostLateProjectsInGate5,
                        this.coordinationMetrics().almostLateProjectsInGate6
                    ],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Atrasado',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                    data: [
                        this.coordinationMetrics().lateProjectsInGate1,
                        this.coordinationMetrics().lateProjectsInGate2,
                        this.coordinationMetrics().lateProjectsInGate3,
                        this.coordinationMetrics().lateProjectsInGate4,
                        this.coordinationMetrics().lateProjectsInGate5,
                        this.coordinationMetrics().lateProjectsInGate6
                    ],
                    borderRadius: {
                        topLeft: 8,
                        topRight: 8,
                        bottomLeft: 0,
                        bottomRight: 0
                    },
                    borderSkipped: false,
                    barThickness: 32
                }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: 'transparent',
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: borderColor,
                        drawTicks: false
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
