import { Component, inject, OnInit } from '@angular/core';
import { DatePicker, DatePickerMonthChangeEvent } from 'primeng/datepicker';
import { MeetingsService } from '@/services/meetings.service';
import { TimeSlot } from '@/pages/projects/entities/timeSlot';
import { format, isBefore, lastDayOfMonth, max, startOfMonth } from 'date-fns';
import { RadioButton } from 'primeng/radiobutton';
import { MeetingType } from '@/pages/projects/entities/project';
import { FormsModule } from '@angular/forms';
import { MeetingTypeEnum } from '@/pages/meetings/entities/meetingListing';
import { ScrollPanel } from 'primeng/scrollpanel';
import { Button } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import {ProjectService} from "@/services/project.service";
import {ToastService} from "@/services/toast.service";

@Component({
    selector: 'app-schedule-meeting-dialog',
    imports: [DatePicker, RadioButton, FormsModule, ScrollPanel, Button, DatePipe, ConfirmDialog],
    templateUrl: './schedule-meeting-dialog.html',
    styleUrl: './schedule-meeting-dialog.scss'
})
export class ScheduleMeetingDialog implements OnInit {
    private meetingsService: MeetingsService = inject(MeetingsService);
    private projectService : ProjectService = inject(ProjectService);
    private toastService : ToastService = inject(ToastService);
    private confirmationService: ConfirmationService = inject(ConfirmationService);
    private config: DynamicDialogConfig = inject(DynamicDialogConfig);
    private dynamicDialogRef : DynamicDialogRef = inject(DynamicDialogRef);

    private activeGate!: number;
    private projectId !: number;

    protected timeSlots: TimeSlot[] = [];
    protected availableTimeSlotsInSelectedDay: TimeSlot[] = [];
    protected daysWithAvailableSchedules: string[] = [];
    protected minDate = new Date();
    protected readonly MeetingTypeEnum = MeetingTypeEnum;

    protected selectedDay!: any;
    protected meetingType!: MeetingType;
    protected selectedTimeSlot!: TimeSlot | null;

    //TODO utilizar formGroup
    ngOnInit(): void {
        this.getTimeSlots(this.getStringIsoDate(this.minDate), '2025-11-30');
        this.activeGate = this.config.data.activeGate;
        this.projectId = this.config.data.projectId;
    }

    private getTimeSlots(startDate: string, endDate: string) {
        this.meetingsService.getTimeSlots(startDate, endDate).subscribe((response) => {
            this.timeSlots = response.filter((ts) => ts.available);
            this.daysWithAvailableSchedules = this.getUniqueScheduleDates(this.timeSlots);
        });
    }

    private getStringIsoDate(date: Date): string {
        return format(date, 'yyyy-MM-dd');
    }

    private getUniqueScheduleDates(timeSlots: TimeSlot[]): string[] {
        return [...new Set(timeSlots.map((ts) => ts.scheduleDate))];
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
        this.availableTimeSlotsInSelectedDay = this.timeSlots.filter((ts) => ts.scheduleDate === isoDate);
        this.selectedTimeSlot = null;
    }

    protected schedule() {
        let scheduleMeeting = () => {
            const data = {
                timeSlotId: this.selectedTimeSlot?.id,
                scheduleDate: this.selectedTimeSlot?.scheduleDate,
                type: this.meetingType
            }

            this.projectService.scheduleMeeting(this.projectId, data).subscribe((meeting) => {
                this.toastService.success(`Reunião de ${this.getSelectedMeetingType()} agendada com sucesso!`);
                this.dynamicDialogRef.close(meeting);
            })
        }
        this.confirmationService.confirm({
            header: 'Confirmação',
            message: 'Por favor, confirme as informações selecionadas. Uma vez agendada a reunião, poderá ser cancelada somente pela coordenação.',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: "Confirmar",
            rejectButtonProps: {
                label: 'Cancelar',
                icon: 'pi pi-times',
                variant: 'outlined',
                severity: 'secondary'
            },
            accept: scheduleMeeting
        });
    }

    protected getSelectedProfessorName(): string {
        return this.selectedTimeSlot?.professor.name ? this.selectedTimeSlot.professor.name : '-';
    }

    protected getSelectedMeetingType(): string {
        return (this.meetingType === MeetingType.GATE ? 'Apresentação - Gate ' : 'Acompanhamento - Stage ') + this.activeGate;
    }
}
