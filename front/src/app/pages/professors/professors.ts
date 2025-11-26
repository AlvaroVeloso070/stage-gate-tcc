import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MeetingDTO, GateResultEnum } from '@/pages/professors/entities/professor-meeting';
import { Button } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TagMeetingStatus } from '@/pages/meetings/components/tag-meeting-status/tag-meeting-status';
import { DatePipe, CommonModule } from '@angular/common';
import { ProfessorService } from '@/services/professor.service';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { FilterOption } from '@/shared/dtos/FilterOption';
import { MeetingStatusEnum, MeetingTypeEnum } from '@/pages/meetings/entities/meetingListing';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FeedbackDialog } from '@/pages/professors/components/feedback-dialog/feedback-dialog';
import { ToastService } from '@/services/toast.service';
import { Tooltip } from 'primeng/tooltip';
import { parseISO, startOfDay } from 'date-fns';
import { UserService } from '@/services/user.service';
import { User } from '@/pages/users/entities/user';

@Component({
    selector: 'app-professors',
    imports: [Button, TableModule, TagMeetingStatus, DatePipe, Select, FormsModule, Tooltip, CommonModule],
    templateUrl: './professors.html',
    styleUrl: './professors.scss'
})
export class Professors implements OnInit {
    private readonly professorService: ProfessorService = inject(ProfessorService);
    private readonly dialogService: DialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
    private readonly toastService: ToastService = inject(ToastService);
    private readonly userService: UserService = inject(UserService);

    protected meetingsList!: MeetingDTO[];
    protected professors: User[] = [];
    protected selectedProfessor: User | null = null;

    // Expose enums to template
    protected readonly MeetingTypeEnum = MeetingTypeEnum;
    protected readonly GateResultEnum = GateResultEnum;

    protected statuses: FilterOption[] = [
        { label: 'Completa', value: MeetingStatusEnum.COMPLETED },
        { label: 'Agendada', value: MeetingStatusEnum.PENDING },
        { label: 'Cancelada', value: MeetingStatusEnum.CANCELLED }
    ];

    @ViewChild('dt') table!: Table;

    ngOnInit(): void {
        this.loadProfessors();
    }

    private loadProfessors(): void {
        this.userService.getAllUsers().subscribe((users) => {
            this.professors = users.filter((user) => user.type === 'PROFESSOR');
            if (this.professors.length > 0) {
                this.selectedProfessor = this.professors[0];
                this.loadMeetings();
            }
        });
    }

    protected onProfessorChange(): void {
        this.loadMeetings();
    }

    private loadMeetings(): void {
        if (!this.selectedProfessor) {
            this.meetingsList = [];
            return;
        }

        this.professorService.getProfessorMeetings(this.selectedProfessor.id).subscribe((meetings) => {
            this.meetingsList = meetings.map((item) => ({
                ...item,
                scheduleDate: item.scheduleDate
            }));
        });
    }

    protected canProvideFeedback(meeting: MeetingDTO): boolean {
        return (meeting.status === MeetingStatusEnum.PENDING || meeting.status === MeetingStatusEnum.PENDING_FEEDBACK || meeting.status === MeetingStatusEnum.LATE_FEEDBACK) && meeting.report === null;
    }

    protected hasReport(meeting: MeetingDTO): boolean {
        return meeting.report !== null;
    }

    protected getFeedbackStatus(meeting: MeetingDTO): string {
        const status = this.hasReport(meeting) ? 'submitted' : 'pending';
        return status;
    }

    protected getGateResultStatus(meeting: MeetingDTO): string | null {
        if (meeting.type !== MeetingTypeEnum.GATE || !this.hasReport(meeting)) {
            return null;
        }
        return meeting.report?.gateResult === GateResultEnum.APPROVED ? 'approved' : 'rejected';
    }

    protected provideFeedback(meeting: MeetingDTO): void {
        this.dialogRef = this.dialogService.open(FeedbackDialog, {
            header: 'Fornecer Feedback da Reunião',
            focusOnShow: false,
            closable: true,
            closeOnEscape: true,
            modal: true,
            width: '600px',
            height: 'auto',
            data: {
                meeting: meeting,
                viewOnly: false
            }
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.loadMeetings();
            }
        });
    }

    protected viewReport(meeting: MeetingDTO): void {
        this.dialogRef = this.dialogService.open(FeedbackDialog, {
            header: 'Visualizar Feedback da Reunião',
            focusOnShow: false,
            closable: true,
            closeOnEscape: true,
            modal: true,
            width: '600px',
            height: 'auto',
            data: {
                meeting: meeting,
                viewOnly: true
            }
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.loadMeetings();
            }
        });
    }

    protected getMeetingTypeLabel(type: MeetingTypeEnum): string {
        return type === MeetingTypeEnum.GATE ? 'Gate' : 'Stage';
    }

    protected getStatusLabel(status: MeetingStatusEnum): string {
        const labels: { [key: string]: string } = {
            [MeetingStatusEnum.PENDING]: 'Pendente',
            [MeetingStatusEnum.PENDING_FEEDBACK]: 'Feedback Pendente',
            [MeetingStatusEnum.LATE_FEEDBACK]: 'Feedback Atrasado',
            [MeetingStatusEnum.COMPLETED]: 'Completa',
            [MeetingStatusEnum.CANCELLED]: 'Cancelada'
        };
        return labels[status] || status;
    }
}
