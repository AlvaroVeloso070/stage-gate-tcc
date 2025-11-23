import {Component, inject, input, InputSignal, OnInit} from '@angular/core';
import {GateResultEnum, MeetingConsult, MeetingType} from '@/pages/projects/entities/project';
import {Timeline} from 'primeng/timeline';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {GATES} from '@/constants/gates';
import {Button} from 'primeng/button';
import {TagStatusGateApproval} from '@/pages/projects/components/tag-status-gate-approval/tag-status-gate-approval';
import {ProjectService} from '@/services/project.service';

@Component({
    selector: 'project-meetings',
    imports: [Timeline, DatePipe, Button, NgClass, TagStatusGateApproval, NgIf],
    templateUrl: './project-meetings.html',
    styleUrl: './project-meetings.scss'
})
export class ProjectMeetings implements OnInit {
    private readonly projectService: ProjectService = inject(ProjectService);

    public projectId: InputSignal<string> = input.required();
    protected meetings!: MeetingConsult[];
    protected readonly MeetingType = MeetingType;

    ngOnInit(): void {
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
}
