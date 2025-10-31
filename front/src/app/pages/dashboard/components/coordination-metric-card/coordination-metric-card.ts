import {Component, input, InputSignal} from '@angular/core';
import {NgClass} from "@angular/common";

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
}
