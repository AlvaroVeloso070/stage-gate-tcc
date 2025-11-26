import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MeetingListing, MeetingStatusEnum, MeetingTypeEnum } from '@/pages/meetings/entities/meetingListing';
import { DatePipe } from '@angular/common';
import { TagMeetingStatus } from '@/pages/meetings/components/tag-meeting-status/tag-meeting-status';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-meeting-view-dialog',
    imports: [DatePipe, TagMeetingStatus, Button],
    templateUrl: './meeting-view-dialog.html',
    styleUrl: './meeting-view-dialog.scss'
})
export class MeetingViewDialog implements OnInit {
    private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
    private readonly config: DynamicDialogConfig = inject(DynamicDialogConfig);

    protected meeting!: MeetingListing;
    protected meetingTypeLabel!: string;

    ngOnInit(): void {
        this.meeting = this.config.data.meeting;
        this.meetingTypeLabel = this.getMeetingTypeLabel(this.meeting.type);
    }

    protected close(): void {
        this.dialogRef.close();
    }

    private getMeetingTypeLabel(type: MeetingTypeEnum): string {
        const labels = {
            [MeetingTypeEnum.GATE]: 'Gate',
            [MeetingTypeEnum.STAGE]: 'Stage'
        };
        return labels[type] || type;
    }

    protected getStatusLabel(status: MeetingStatusEnum): string {
        const labels = {
            [MeetingStatusEnum.PENDING]: 'Pendente',
            [MeetingStatusEnum.PENDING_FEEDBACK]: 'Feedback Pendente',
            [MeetingStatusEnum.LATE_FEEDBACK]: 'Feedback Atrasado',
            [MeetingStatusEnum.COMPLETED]: 'Completa',
            [MeetingStatusEnum.CANCELLED]: 'Cancelada'
        };
        return labels[status] || status;
    }
}
