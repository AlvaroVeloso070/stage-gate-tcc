import { Component, computed, input, InputSignal, OnInit, signal } from '@angular/core';
import { DueDateStatus } from '@/pages/projects/entities/projectListing';
import { Tag } from 'primeng/tag';
import { sign } from 'chart.js/helpers';

@Component({
    selector: 'tag-project-status',
    imports: [Tag],
    templateUrl: './tag-project-status.html',
    styleUrl: './tag-project-status.scss'
})
export class TagProjectStatus implements OnInit {
    public status: InputSignal<DueDateStatus> = input.required();
    protected tagValue = signal<string>('-')
    protected tagSeverity = signal<string>('primary')

    ngOnInit(): void {
        switch (this.status()) {
            case DueDateStatus.ON_TIME:
                this.tagValue.set('No prazo');
                this.tagSeverity.set('success');
                break;
            case DueDateStatus.WARNING:
                this.tagValue.set('Alerta');
                this.tagSeverity.set('warn');
                break;
            case DueDateStatus.OVERDUE:
                this.tagValue.set('Atrasado');
                this.tagSeverity.set('danger');
                break;
        }
    }
}
