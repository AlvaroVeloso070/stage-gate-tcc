import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { MeetingListing, MeetingStatusEnum, MeetingTypeEnum } from '@/pages/meetings/entities/meetingListing';
import { Button } from 'primeng/button';
import {Table, TableModule} from 'primeng/table';
import { TagMeetingStatus } from '@/pages/meetings/components/tag-meeting-status/tag-meeting-status';
import { DatePipe } from '@angular/common';
import { CoordinationService } from '@/services/coordination.service';
import { ActivatedRoute } from '@angular/router';
import {Select} from "primeng/select";
import {FormsModule} from "@angular/forms";
import {DatePicker} from "primeng/datepicker";
import {FilterOption} from "@/shared/dtos/FilterOption";
import {parseISO, startOfDay} from "date-fns";

@Component({
    selector: 'app-meetings',
    imports: [Button, TableModule, TagMeetingStatus, DatePipe, Select, FormsModule, DatePicker],
    templateUrl: './meetings.html',
    styleUrl: './meetings.scss'
})
export class Meetings implements OnInit {

    private readonly coordinationService : CoordinationService = inject(CoordinationService);
    private readonly route : ActivatedRoute = inject(ActivatedRoute);

    protected meetingsList!: MeetingListing[];
    protected statuses : FilterOption[] = [
        {label: 'Completa', value: MeetingStatusEnum.COMPLETED},
        {label: 'Pendente', value: MeetingStatusEnum.PENDING},
        {label: 'Feedback Atrasado', value: MeetingStatusEnum.LATE_FEEDBACK},
        {label: 'Feedback Pendente', value: MeetingStatusEnum.PENDING_FEEDBACK},
        {label: 'Cancelada', value: MeetingStatusEnum.CANCELLED},
    ];

    @ViewChild('dt') table!: Table;

    ngOnInit(): void {
        this.coordinationService.getAllMeetings().subscribe(meetings => {
            this.meetingsList = meetings.map(item => ({
                ...item,
                scheduleDate: startOfDay(new Date(item.scheduleDate + 'T00:00:00'))
            }));
            this.applyPreFilters();
        })
    }

    private applyPreFilters() {
        this.route.queryParams.subscribe(params => {
            if (params['filter'] && params['filter'] === 'TODAY' ){
                this.table.filters = {
                    ...this.table.filters,
                    scheduleDate: [
                        {
                            value: startOfDay(new Date()),
                            matchMode: 'dateIs'
                        }
                    ]
                }

                this.table._filter();
            }
        });
    }
}
