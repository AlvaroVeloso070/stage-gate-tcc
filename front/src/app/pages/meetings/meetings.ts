import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MeetingListing, MeetingStatusEnum} from '@/pages/meetings/entities/meetingListing';
import {Button} from 'primeng/button';
import {Table, TableModule} from 'primeng/table';
import {TagMeetingStatus} from '@/pages/meetings/components/tag-meeting-status/tag-meeting-status';
import {DatePipe} from '@angular/common';
import {CoordinationService} from '@/services/coordination.service';
import {ActivatedRoute} from '@angular/router';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {FilterOption} from '@/shared/dtos/FilterOption';
import {startOfDay} from 'date-fns';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MeetingFormDialog} from '@/pages/meetings/components/meeting-dialog/meeting-form-dialog';
import {MeetingViewDialog} from '@/pages/meetings/components/meeting-view-dialog/meeting-view-dialog';
import {ToastService} from '@/services/toast.service';
import {ConfirmationService} from 'primeng/api';
import {MeetingsService} from '@/services/meetings.service';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Tooltip} from 'primeng/tooltip';

@Component({
    selector: 'app-meetings',
    imports: [Button, TableModule, TagMeetingStatus, DatePipe, Select, FormsModule, ConfirmDialog, Tooltip],
    providers: [ConfirmationService],
    templateUrl: './meetings.html',
    styleUrl: './meetings.scss'
})
export class Meetings implements OnInit {
    private readonly coordinationService: CoordinationService = inject(CoordinationService);
    private readonly route: ActivatedRoute = inject(ActivatedRoute);
    private readonly dialogService: DialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
    private readonly toastService: ToastService = inject(ToastService);
    private readonly confirmationService: ConfirmationService = inject(ConfirmationService);
    private readonly meetingsService: MeetingsService = inject(MeetingsService);

    protected meetingsList!: MeetingListing[];
    protected statuses: FilterOption[] = [
        { label: 'Completa', value: MeetingStatusEnum.COMPLETED },
        { label: 'Pendente', value: MeetingStatusEnum.PENDING },
        { label: 'Feedback Atrasado', value: MeetingStatusEnum.LATE_FEEDBACK },
        { label: 'Feedback Pendente', value: MeetingStatusEnum.PENDING_FEEDBACK },
        { label: 'Cancelada', value: MeetingStatusEnum.CANCELLED }
    ];

    @ViewChild('dt') table!: Table;

    ngOnInit(): void {
        this.coordinationService.getAllMeetings().subscribe((meetings) => {
            this.meetingsList = meetings.map((item) => ({
                ...item,
                scheduleDate: startOfDay(new Date(item.scheduleDate + 'T00:00:00'))
            }));
            this.applyPreFilters();
        });
    }

    private applyPreFilters() {
        this.route.queryParams.subscribe((params) => {
            if (params['filter'] && params['filter'] === 'TODAY') {
                this.table.filters = {
                    ...this.table.filters,
                    scheduleDate: [
                        {
                            value: startOfDay(new Date()),
                            matchMode: 'dateIs'
                        }
                    ]
                };

                this.table._filter();
            }
        });
    }

    protected newMeeting() {
        this.dialogRef = this.dialogService.open(MeetingFormDialog, {
            header: 'Incluir nova Reunião',
            focusOnShow: false,
            closable: true,
            closeOnEscape: true,
            modal: true,
            width: '500px',
            height: 'auto'
        });

        this.dialogRef.onClose.subscribe((meeting) => {
            if (meeting) {
                this.ngOnInit();
            }
        });
    }

    protected edit(meeting: MeetingListing) {
        this.dialogRef = this.dialogService.open(MeetingFormDialog, {
            header: 'Editar Reunião',
            focusOnShow: false,
            closable: true,
            closeOnEscape: true,
            modal: true,
            width: '500px',
            height: 'auto',
            data: {
                meeting: meeting
            }
        });

        this.dialogRef.onClose.subscribe((meeting) => {
            if (meeting) {
                this.ngOnInit();
            }
        });
    }

    protected view(meeting: MeetingListing): void {
        this.dialogRef = this.dialogService.open(MeetingViewDialog, {
            header: 'Detalhes da Reunião',
            focusOnShow: false,
            closable: true,
            closeOnEscape: true,
            modal: true,
            width: '600px',
            height: 'auto',
            data: {
                meeting: meeting
            }
        });
    }

    protected delete(meeting: MeetingListing): void {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja cancelar a reunião do projeto ${meeting.projectTitle}?`,
            header: 'Confirmar Cancelamento',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonProps: {
                severity: 'danger'
            },
            rejectButtonProps: {
                severity: 'secondary'
            },
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.meetingsService.cancelMeeting(meeting.id).subscribe({
                    next: () => {
                        this.toastService.success('Reunião cancelada com sucesso!');
                        this.ngOnInit();
                    },
                    error: (error) => {
                        const errorMessage = error?.error?.message || 'Erro ao cancelar reunião';
                        this.toastService.error(errorMessage);
                    }
                });
            }
        });
    }
}
