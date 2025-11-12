import { Component, input, InputSignal, OnInit, signal } from '@angular/core';
import { Tag } from 'primeng/tag';
import { ProjectStatus } from '@/pages/projects/entities/project';

@Component({
    selector: 'tag-project-status',
    imports: [Tag],
    templateUrl: './tag-project-status.html',
    styleUrl: './tag-project-status.scss'
})
export class TagProjectStatus implements OnInit {
    public status: InputSignal<ProjectStatus> = input.required();
    protected tagValue = signal<string>('-');
    protected tagSeverity = signal<string>('primary');

    ngOnInit(): void {
        switch (this.status()) {
            case ProjectStatus.IN_PROGRESS:
                this.tagValue.set('Em andamento');
                this.tagSeverity.set('primary');
                break;
            case ProjectStatus.CANCELLED:
                this.tagValue.set('Cancelado');
                this.tagSeverity.set('danger');
                break;
            case ProjectStatus.COMPLETED:
                this.tagValue.set('Completo');
                this.tagSeverity.set('success');
                break;
        }
    }
}
