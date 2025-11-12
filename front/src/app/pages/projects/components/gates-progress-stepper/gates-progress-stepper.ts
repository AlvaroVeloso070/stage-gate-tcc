import { Component, input, InputSignal } from '@angular/core';
import { Step, StepList, Stepper } from 'primeng/stepper';
import { NgClass } from '@angular/common';
import { GATES } from '@/constants/gates';

@Component({
    selector: 'gates-progress-stepper',
    imports: [Step, StepList, Stepper, NgClass],
    templateUrl: './gates-progress-stepper.html',
    standalone: true,
    styleUrl: './gates-progress-stepper.scss'
})
export class GatesProgressStepper {
    activeStep: InputSignal<number> = input(1);
    isAllGatesCompleted: InputSignal<boolean> = input.required();

    isGateActive(value: number): boolean {
        return value === this.activeStep() && !this.isAllGatesCompleted();
    }

    isGateCompleted(value: number): boolean {
        return this.isAllGatesCompleted() || value < this.activeStep();
    }

    protected readonly GATES = GATES;
}
