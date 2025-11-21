import { Component, inject, OnInit } from '@angular/core';
import { MeetingListing, MeetingStatusEnum, MeetingTypeEnum } from '@/pages/meetings/entities/meetingListing';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagMeetingStatus } from '@/pages/meetings/components/tag-meeting-status/tag-meeting-status';
import { DatePipe } from '@angular/common';
import { CoordinationService } from '@/services/coordination.service';
import { ActivatedRoute } from '@angular/router';
import {Select} from "primeng/select";
import {FormsModule} from "@angular/forms";
import {DatePicker} from "primeng/datepicker";

@Component({
    selector: 'app-meetings',
    imports: [Button, TableModule, TagMeetingStatus, DatePipe, Select, FormsModule, DatePicker],
    templateUrl: './meetings.html',
    styleUrl: './meetings.scss'
})
export class Meetings implements OnInit {

    private coordinationService : CoordinationService = inject(CoordinationService);
    protected meetingsList!: MeetingListing[];
    protected statuses : MeetingStatusEnum[] = Object.values(MeetingStatusEnum);

    ngOnInit(): void {
        this.coordinationService.getAllMeetings().subscribe(meetings => {
            this.meetingsList = meetings.map(item => ({
                ...item,
                scheduleDate: new Date(item.scheduleDate) // converte '2025-11-22' → Date
            }));;
        })
    }
}
