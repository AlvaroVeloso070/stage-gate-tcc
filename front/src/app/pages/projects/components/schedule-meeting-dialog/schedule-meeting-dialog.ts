import { Component, inject, OnInit } from '@angular/core';
import { DatePicker, DatePickerMonthChangeEvent } from 'primeng/datepicker';
import { MeetingsService } from '@/services/meetings.service';
import { DayOfWeek, TimeSlot } from '@/pages/projects/entities/timeSlot';
import { format, isBefore, lastDayOfMonth, max, startOfMonth } from 'date-fns';
import { RadioButton } from 'primeng/radiobutton';
import { MeetingType, UserTypeEnum } from '@/pages/projects/entities/project';
import { FormsModule } from '@angular/forms';
import { MeetingTypeEnum } from '@/pages/meetings/entities/meetingListing';
import { ScrollPanel } from 'primeng/scrollpanel';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-schedule-meeting-dialog',
    imports: [DatePicker, RadioButton, FormsModule, ScrollPanel, Button],
    templateUrl: './schedule-meeting-dialog.html',
    styleUrl: './schedule-meeting-dialog.scss'
})
export class ScheduleMeetingDialog implements OnInit {
    private meetingsService: MeetingsService = inject(MeetingsService);

    protected timeSlots: TimeSlot[] = [];
    protected availableTimeSlotsInSelectedDay: TimeSlot[] = [];
    protected daysWithAvailableSchedules: string[] = [];
    protected minDate = new Date();
    protected readonly MeetingTypeEnum = MeetingTypeEnum;

    protected selectedDay!: any;
    protected meetingType!: MeetingType;
    protected selectedTimeSlot!: TimeSlot | null;

    ngOnInit(): void {
        this.getTimeSlots(this.getStringIsoDate(this.minDate), '2025-11-30');
    }

    private getTimeSlots(startDate: string, endDate: string) {
        this.meetingsService.getTimeSlots(startDate, endDate).subscribe((response) => {
            this.timeSlots = response;
            this.daysWithAvailableSchedules = this.getUniqueScheduleDates(this.timeSlots);
        });
    }

    private getStringIsoDate(date: Date): string {
        return format(date, 'yyyy-MM-dd');
    }

    private getUniqueScheduleDates(timeSlots: TimeSlot[]): string[] {
        return [...new Set(timeSlots.filter((ts) => ts.available).map((ts) => ts.scheduleDate))];
    }

    protected existsPossibleSchedule(date: any): boolean {
        return this.daysWithAvailableSchedules.includes(date.year + '-' + (date.month + 1 < 10 ? '0' : '') + (date.month + 1) + '-' + (date.day < 10 ? '0' : '') + date.day);
    }

    public onMonthChange($event: DatePickerMonthChangeEvent) {
        if ($event.year && $event.month) {
            const selected = new Date($event.year, $event.month - 1, 1);

            if (isBefore(selected, startOfMonth(this.minDate))) {
                this.timeSlots = [];
                this.daysWithAvailableSchedules = [];
                return;
            }

            const firstDayOfMonth = startOfMonth(selected);
            const lastDayOfMonthValue = lastDayOfMonth(selected);

            const safeStartDate = max([firstDayOfMonth, this.minDate]);

            this.getTimeSlots(this.getStringIsoDate(safeStartDate), this.getStringIsoDate(lastDayOfMonthValue));
        }
    }

    protected onSelectDate(date: Date) {
        let isoDate = this.getStringIsoDate(date);
        // this.availableTimeSlotsInSelectedDay = this.timeSlots.filter((ts) => ts.scheduleDate === isoDate);
        this.availableTimeSlotsInSelectedDay = [
            {
                scheduleDate: '2025-11-14',
                id: '5eafeffd-d543-4c7d-bc22-4e0f0a145a41',
                startTime: '18:00:00',
                endTime: '19:00:00',
                dayOfWeek: DayOfWeek.FRIDAY,
                professor: {
                    id: '00000000-2222-0000-0000-000000000003',
                    name: 'Professor 2',
                    email: 'professor2@ufg.br',
                    type: UserTypeEnum.PROFESSOR
                },
                available: true
            },
            {
                scheduleDate: '2025-11-14',
                id: '5eafeffd-d543-4c7d-bc22-4e0f0a145a41',
                startTime: '18:00:00',
                endTime: '19:00:00',
                dayOfWeek: DayOfWeek.FRIDAY,
                professor: {
                    id: '00000000-2222-0000-0000-000000000003',
                    name: 'Professor 2',
                    email: 'professor2@ufg.br',
                    type: UserTypeEnum.PROFESSOR
                },
                available: true
            },
            {
                scheduleDate: '2025-11-14',
                id: '5eafeffd-d543-4c7d-bc22-4e0f0a145a41',
                startTime: '18:00:00',
                endTime: '19:00:00',
                dayOfWeek: DayOfWeek.FRIDAY,
                professor: {
                    id: '00000000-2222-0000-0000-000000000003',
                    name: 'Professor 2',
                    email: 'professor2@ufg.br',
                    type: UserTypeEnum.PROFESSOR
                },
                available: true
            },
            {
                scheduleDate: '2025-11-14',
                id: '5eafeffd-d543-4c7d-bc22-4e0f0a145a41',
                startTime: '18:00:00',
                endTime: '19:00:00',
                dayOfWeek: DayOfWeek.FRIDAY,
                professor: {
                    id: '00000000-2222-0000-0000-000000000003',
                    name: 'Professor 2',
                    email: 'professor2@ufg.br',
                    type: UserTypeEnum.PROFESSOR
                },
                available: true
            },
            {
                scheduleDate: '2025-11-14',
                id: '5eafeffd-d543-4c7d-bc22-4e0f0a145a41',
                startTime: '18:00:00',
                endTime: '19:00:00',
                dayOfWeek: DayOfWeek.FRIDAY,
                professor: {
                    id: '00000000-2222-0000-0000-000000000003',
                    name: 'Professor 2',
                    email: 'professor2@ufg.br',
                    type: UserTypeEnum.PROFESSOR
                },
                available: true
            },
            {
                scheduleDate: '2025-11-14',
                id: '5eafeffd-d543-4c7d-bc22-4e0f0a145a41',
                startTime: '18:00:00',
                endTime: '19:00:00',
                dayOfWeek: DayOfWeek.FRIDAY,
                professor: {
                    id: '00000000-2222-0000-0000-000000000003',
                    name: 'Professor 2',
                    email: 'professor2@ufg.br',
                    type: UserTypeEnum.PROFESSOR
                },
                available: true
            },
            {
                scheduleDate: '2025-11-14',
                id: '5eafeffd-d543-4c7d-bc22-4e0f0a145a41',
                startTime: '18:00:00',
                endTime: '19:00:00',
                dayOfWeek: DayOfWeek.FRIDAY,
                professor: {
                    id: '00000000-2222-0000-0000-000000000003',
                    name: 'Professor 2',
                    email: 'professor2@ufg.br',
                    type: UserTypeEnum.PROFESSOR
                },
                available: true
            },
            {
                scheduleDate: '2025-11-14',
                id: '5eafeffd-d543-4c7d-bc22-4e0f0a145a41',
                startTime: '18:00:00',
                endTime: '19:00:00',
                dayOfWeek: DayOfWeek.FRIDAY,
                professor: {
                    id: '00000000-2222-0000-0000-000000000003',
                    name: 'Professor 2',
                    email: 'professor2@ufg.br',
                    type: UserTypeEnum.PROFESSOR
                },
                available: true
            },
            {
                scheduleDate: '2025-11-14',
                id: '5eafeffd-d543-4c7d-bc22-4e0f0a145a41',
                startTime: '18:00:00',
                endTime: '19:00:00',
                dayOfWeek: DayOfWeek.FRIDAY,
                professor: {
                    id: '00000000-2222-0000-0000-000000000003',
                    name: 'Professor 2',
                    email: 'professor2@ufg.br',
                    type: UserTypeEnum.PROFESSOR
                },
                available: true
            },
            {
                scheduleDate: '2025-11-14',
                id: '5eafeffd-d543-4c7d-bc22-4e0f0a145a41',
                startTime: '18:00:00',
                endTime: '19:00:00',
                dayOfWeek: DayOfWeek.FRIDAY,
                professor: {
                    id: '00000000-2222-0000-0000-000000000003',
                    name: 'Professor 2',
                    email: 'professor2@ufg.br',
                    type: UserTypeEnum.PROFESSOR
                },
                available: true
            }
        ];
        this.selectedTimeSlot = null;
    }
}
