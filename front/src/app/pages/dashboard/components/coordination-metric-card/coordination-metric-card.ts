import {Component, inject, input, InputSignal} from '@angular/core';
import {NgClass} from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'coordination-metric',
    imports: [
        NgClass
    ],
  templateUrl: './coordination-metric-card.html',
  styleUrl: './coordination-metric-card.scss'
})
export class CoordinationMetric {

    private router : Router = inject(Router);

    public metricName : InputSignal<string> = input.required<string>();
    public metricValue : InputSignal<number> = input.required<number>();
    public icon : InputSignal<string> = input.required<string>();
    public iconColor : InputSignal<string> = input.required<string>();

    protected onViewDetails() {
        this.router.navigateByUrl("/pages/projects")
    }
}
