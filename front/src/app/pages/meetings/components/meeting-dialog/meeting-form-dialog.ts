import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { ToastService } from '@/services/toast.service';
import { CreateMeetingRequest } from '@/pages/meetings/entities/meeting';
import { MeetingTypeEnum } from '@/pages/meetings/entities/meetingListing';
import { DatePicker } from 'primeng/datepicker';
import { CoordinationService } from '@/services/coordination.service';
import { ProjectListing } from '@/pages/projects/entities/projectListing';
import { MeetingsService } from '@/services/meetings.service';
import { TimeSlot } from '@/pages/projects/entities/timeSlot';
import { format, addDays } from 'date-fns';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-meeting-form-dialog',
    imports: [Select, Button, FormsModule, DatePicker, NgIf],
    templateUrl: './meeting-form-dialog.html',
    styleUrl: './meeting-form-dialog.scss'
})
export class MeetingFormDialog implements OnInit {
    private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
    private readonly dialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
    private readonly toastService: ToastService = inject(ToastService);
    private readonly coordinationService: CoordinationService = inject(CoordinationService);
    private readonly meetingsService: MeetingsService = inject(MeetingsService);

    protected isEditing: WritableSignal<boolean> = signal(false);
    protected meeting: CreateMeetingRequest = {
        scheduleDate: '',
        timeSlotId: '',
        type: MeetingTypeEnum.GATE
    };
    protected selectedProjectId: string = '';
    protected selectedDate: Date | null = null;
    protected minDate: Date = new Date();
    protected projects: ProjectListing[] = [];
    protected timeSlots: TimeSlot[] = [];
    protected availableTimeSlots: TimeSlot[] = [];

    protected meetingTypeOptions = [
        { label: 'Gate', value: MeetingTypeEnum.GATE },
        { label: 'Stage', value: MeetingTypeEnum.STAGE }
    ];

    ngOnInit(): void {
        const editingMeeting = this.dialogConfig?.data?.meeting;
        if (editingMeeting?.id) {
            this.isEditing.set(true);
            this.toastService.error('Edição de reuniões não está disponível. Por favor, cancele e crie uma nova.');
            this.dialogRef.close();
            return;
        }

        this.loadProjects();
    }

    private loadProjects() {
        this.coordinationService.getAllProjects().subscribe((projects) => {
            this.projects = projects;
        });
    }

    protected onDateChange() {
        if (this.selectedDate) {
            this.loadTimeSlots();
        }
    }

    private loadTimeSlots() {
        if (!this.selectedDate) return;

        const startDate = format(this.selectedDate, 'yyyy-MM-dd');
        const endDate = format(addDays(this.selectedDate, 1), 'yyyy-MM-dd');

        this.meetingsService.getTimeSlots(startDate, endDate).subscribe((slots) => {
            this.timeSlots = slots;
            this.availableTimeSlots = slots.filter((slot) => slot.available);
            this.meeting.scheduleDate = startDate;
        });
    }

    protected getTimeSlotLabel(slot: TimeSlot): string {
        return `${slot.professor.name} - ${slot.startTime} às ${slot.endTime}`;
    }

    protected close() {
        this.dialogRef.close();
    }

    protected save() {
        if (!this.selectedProjectId) {
            this.toastService.error('Selecione um projeto');
            return;
        }

        if (!this.meeting.timeSlotId) {
            this.toastService.error('Selecione um horário disponível');
            return;
        }

        if (!this.meeting.scheduleDate) {
            this.toastService.error('Selecione uma data');
            return;
        }

        this.meetingsService.createMeeting(this.selectedProjectId, this.meeting).subscribe({
            next: (createdMeeting) => {
                this.toastService.success('Reunião criada com sucesso!');
                this.dialogRef.close(createdMeeting);
            },
            error: (error) => {
                const errorMessage = error?.error?.message || 'Erro ao criar reunião';
                this.toastService.error(errorMessage);
            }
        });
    }
}
