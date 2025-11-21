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
    public metricName : InputSignal<string> = input.required<string>();
    public metricValue : InputSignal<number> = input.required<number>();
    public icon : InputSignal<string> = input.required<string>();
    public iconColor : InputSignal<string> = input.required<string>();
    public onClickFunction : InputSignal<Function> = input.required<Function>();

    protected onViewDetails() {
        this.onClickFunction().call(this);
    }
}


