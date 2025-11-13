import { Component, inject, OnInit } from '@angular/core';
import { MeetingListing, MeetingStatusEnum, MeetingTypeEnum } from '@/pages/meetings/entities/meetingListing';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagMeetingStatus } from '@/pages/meetings/components/tag-meeting-status/tag-meeting-status';
import { DatePipe } from '@angular/common';
import { CoordinationService } from '@/services/coordination.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-meetings',
    imports: [Button, TableModule, TagMeetingStatus, DatePipe],
    templateUrl: './meetings.html',
    styleUrl: './meetings.scss'
})
export class Meetings implements OnInit {

    private coordinationService : CoordinationService = inject(CoordinationService);
    protected meetingsList!: MeetingListing[];

    ngOnInit(): void {
        this.coordinationService.getAllMeetings().subscribe(meetings => {
            this.meetingsList = meetings;
        })
    }
}
