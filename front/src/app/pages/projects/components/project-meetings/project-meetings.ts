import {Component, inject, input, InputSignal, OnInit} from '@angular/core';
import {GateResultEnum, MeetingConsult, MeetingType} from '@/pages/projects/entities/project';
import {Timeline} from 'primeng/timeline';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {GATES} from '@/constants/gates';
import {Button} from 'primeng/button';
import {TagStatusGateApproval} from '@/pages/projects/components/tag-status-gate-approval/tag-status-gate-approval';
import {ProjectService} from '@/services/project.service';
import {ScheduleMeetingDialog} from "@/pages/projects/components/schedule-meeting-dialog/schedule-meeting-dialog";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    selector: 'project-meetings',
    imports: [Timeline, DatePipe, Button, NgClass, TagStatusGateApproval, NgIf, NgForOf],
    templateUrl: './project-meetings.html',
    styleUrl: './project-meetings.scss'
})
export class ProjectMeetings implements OnInit {
    private readonly projectService: ProjectService = inject(ProjectService);
    private dialogService: DialogService = inject(DialogService);
    private dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);

    public projectId: InputSignal<string> = input.required();
    public activeGate: InputSignal<number> = input.required();

    protected meetings!: MeetingConsult[];
    protected readonly MeetingType = MeetingType;

    ngOnInit(): void {
        this.listMeetings();
    }

    private listMeetings() {
        this.projectService.getAllProjectMeetings(this.projectId()).subscribe((meetings) => {
            this.meetings = meetings;
        });
    }

    protected isGateMeeting(meeting: MeetingConsult): boolean {
        return meeting.type === MeetingType.GATE;
    }

    protected getTimelineMarker(meeting: MeetingConsult): string {
        return this.isGateMeeting(meeting) ? `G${meeting.stageGateNumber}` : `S${meeting.stageGateNumber}`;
    }

    protected getTimelineHeader(meeting: MeetingConsult) {
        if (meeting.type === MeetingType.GATE) {
            let gateName = GATES.find((gate) => gate.value === meeting.stageGateNumber)?.name;
            return `Reunião de Gate ${meeting.stageGateNumber} - ${gateName}`;
        } else {
            return `Acompanhamento - Stage ${meeting.stageGateNumber}`;
        }
    }

    protected readonly GateResultEnum = GateResultEnum;

    protected getGateMeetingsCount(): number {
        return this.meetings?.filter((meeting) => this.isGateMeeting(meeting)).length || 0;
    }

    protected getStageMeetingsCount(): number {
        return this.meetings?.filter((meeting) => !this.isGateMeeting(meeting)).length || 0;
    }

    protected scheduleMeeting() {
        this.dynamicDialogRef = this.dynamicDialogRef = this.dialogService.open(ScheduleMeetingDialog, {
            header: 'Agendar nova reunião',
            width: '960px',
            height: '470px',
            focusOnShow: false,
            closable: true,
            closeOnEscape: true,
            modal: true,
            data: {
                projectId: this.projectId(),
                activeGate: this.activeGate()
            }
        });

        this.dynamicDialogRef.onClose.subscribe((meeting) => {
            this.listMeetings();
        })
    }
}
