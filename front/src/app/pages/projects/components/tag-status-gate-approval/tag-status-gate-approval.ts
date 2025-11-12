import { Component, input, InputSignal, OnInit, signal } from '@angular/core';
import {Tag} from "primeng/tag";
import { GateResultEnum, ProjectStatus } from '@/pages/projects/entities/project';

@Component({
    selector: 'tag-status-gate-approval',
    imports: [Tag],
    templateUrl: './tag-status-gate-approval.html',
    styleUrl: './tag-status-gate-approval.scss'
})
export class TagStatusGateApproval implements OnInit {
    public status: InputSignal<GateResultEnum> = input.required();
    protected tagValue = signal<string>('-');
    protected tagSeverity = signal<string>('primary');

    ngOnInit(): void {
        switch (this.status()) {
            case GateResultEnum.APPROVED:
                this.tagValue.set('Aprovado');
                this.tagSeverity.set('primary');
                break;
            case GateResultEnum.REJECTED:
                this.tagValue.set('Reprovado');
                this.tagSeverity.set('danger');
                break;
            default:
                this.tagValue.set('Pendente');
                this.tagSeverity.set('warn');
                break;
        }
    }
}
