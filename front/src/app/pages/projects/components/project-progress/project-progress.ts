import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { Project } from '@/pages/projects/entities/project';
import { Message } from 'primeng/message';
import { GATES } from '@/constants/gates';
import { DatePipe } from '@angular/common';
import { Panel } from 'primeng/panel';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScheduleMeetingDialog } from '@/pages/projects/components/schedule-meeting-dialog/schedule-meeting-dialog';

@Component({
    selector: 'project-progress',
    imports: [Message, DatePipe, Panel, Button],
    templateUrl: './project-progress.html',
    styleUrl: './project-progress.scss'
})
export class ProjectProgress implements OnInit {
    public project: InputSignal<Project> = input.required();
    public activeGate: InputSignal<number> = input.required();

    private dialogService : DialogService = inject(DialogService);
    private dynamicDialogRef : DynamicDialogRef = inject(DynamicDialogRef);

    protected dueDateActiveGate!: string;
    protected infoActiveGate!: string;
    protected remainingDaysInGate!: number;

    ngOnInit(): void {
        this.dueDateActiveGate = this.getDueDateAtiveGate();
        this.infoActiveGate = this.getInfoActiveGate();
        this.remainingDaysInGate = this.getRemainingDays(this.dueDateActiveGate);
    }

    private getInfoActiveGate(): string {
        let gate = GATES.find((gate) => gate.value === this.activeGate());
        return `Gate ${gate?.value} - ${gate?.name}`;
    }

    private getDueDateAtiveGate(): string {
        const gate = this.project().gates.find((gate) => gate.number === this.activeGate());
        return gate?.dueDate ? gate.dueDate : '';
    }

    private getRemainingDays(targetDateStr: string): number {
        const targetDate = new Date(targetDateStr);
        const today = new Date();

        targetDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffInMs = targetDate.getTime() - today.getTime();
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        return diffInDays > 0 ? diffInDays : 0;
    }

    protected scheduleMeeting() {
        this.dynamicDialogRef = this.dialogService.open(ScheduleMeetingDialog, {
            header: 'Agendar nova reunião',
            width: '50vw',
            height: '450px',
            focusOnShow: false,
            closable: true,
            closeOnEscape: true,
            modal: true,
            data: {
                projectId: this.project().id,
                activeGate: this.activeGate()
            }
        })
    }
}
