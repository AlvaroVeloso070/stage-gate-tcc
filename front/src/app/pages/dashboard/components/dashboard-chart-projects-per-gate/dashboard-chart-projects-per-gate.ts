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
            labels: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5'],
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
                        this.coordinationMetrics().projectsInGate5
                    ],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Proximo do prazo',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                    data: [
                        this.coordinationMetrics().projectsAlmostLateInGate1,
                        this.coordinationMetrics().projectsAlmostLateInGate2,
                        this.coordinationMetrics().projectsAlmostLateInGate3,
                        this.coordinationMetrics().projectsAlmostLateInGate4,
                        this.coordinationMetrics().projectsAlmostLateInGate5
                    ],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Atrasado',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                    data: [
                        this.coordinationMetrics().projectsLateInGate1,
                        this.coordinationMetrics().projectsLateInGate2,
                        this.coordinationMetrics().projectsLateInGate3,
                        this.coordinationMetrics().projectsLateInGate4,
                        this.coordinationMetrics().projectsLateInGate5
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
