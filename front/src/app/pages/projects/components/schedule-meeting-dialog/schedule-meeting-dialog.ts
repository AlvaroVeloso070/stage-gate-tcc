import { Component, inject, OnInit } from '@angular/core';
import { DatePicker, DatePickerMonthChangeEvent } from 'primeng/datepicker';
import { MeetingsService } from '@/services/meetings.service';
import { TimeSlot } from '@/pages/projects/entities/timeSlot';
import { format, isBefore, lastDayOfMonth, max, startOfMonth } from 'date-fns';

@Component({
    selector: 'app-schedule-meeting-dialog',
    imports: [DatePicker],
    templateUrl: './schedule-meeting-dialog.html',
    styleUrl: './schedule-meeting-dialog.scss'
})
export class ScheduleMeetingDialog implements OnInit {
    private meetingsService: MeetingsService = inject(MeetingsService);

    protected timeSlots!: TimeSlot[];
    protected daysWithAvailableSchedules!: string[];
    protected minDate = new Date();

    ngOnInit(): void {
        this.getTimeSlots(this.getStringIsoDate(this.minDate), '2025-11-30');
    }

    private getTimeSlots(startDate : string, endDate : string) {
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

            const today = new Date();

            const selected = new Date($event.year, $event.month - 1, 1);

            if (isBefore(selected, startOfMonth(today))) {
                this.timeSlots = [];
                this.daysWithAvailableSchedules = [];
                return;
            }

            const firstDayOfMonth = startOfMonth(selected);
            const lastDayOfMonthValue = lastDayOfMonth(selected);

            const safeStartDate = max([firstDayOfMonth, this.minDate]);

            this.getTimeSlots(
                this.getStringIsoDate(safeStartDate),
                this.getStringIsoDate(lastDayOfMonthValue)
            );
        }
    }
}
