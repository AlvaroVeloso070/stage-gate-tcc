import { Component, input, InputSignal } from '@angular/core';
import { Step, StepList, Stepper } from 'primeng/stepper';
import { NgClass } from '@angular/common';

@Component({
    selector: 'gates-progress-stepper',
    imports: [Step, StepList, Stepper, NgClass],
    templateUrl: './gates-progress-stepper.html',
    styleUrl: './gates-progress-stepper.scss'
})
export class GatesProgressStepper {
    activeStep: InputSignal<number> = input(1);
    isAllGatesCompleted: InputSignal<boolean> = input.required();

    gates = [
        { value: 1, name: 'Ideação' },
        { value: 2, name: 'Planejamento' },
        { value: 3, name: 'Desenvolvimento' },
        { value: 4, name: 'Resultados' },
        { value: 5, name: 'Redação' },
        { value: 6, name: 'Defesa' }
    ];

    isGateActive(value: number): boolean {
        return value === this.activeStep() && !this.isAllGatesCompleted();
    }

    isGateCompleted(value: number): boolean {
        return this.isAllGatesCompleted() || value < this.activeStep();
    }
}
