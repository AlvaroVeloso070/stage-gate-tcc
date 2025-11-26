import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MeetingDTO, CreateMeetingReportDTO, GateResultEnum } from '@/pages/professors/entities/professor-meeting';
import { ProfessorService } from '@/services/professor.service';
import { ToastService } from '@/services/toast.service';
import { UserService } from '@/services/user.service';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Textarea } from 'primeng/textarea';
import { MultiSelect } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { Chip } from 'primeng/chip';
import { InputText } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { MeetingTypeEnum } from '@/pages/meetings/entities/meetingListing';
import { User } from '@/pages/users/entities/user';

@Component({
    selector: 'app-feedback-dialog',
    imports: [Button, FormsModule, Textarea, Select, CommonModule],
    templateUrl: './feedback-dialog.html',
    styleUrl: './feedback-dialog.scss'
})
export class FeedbackDialog implements OnInit {
    private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
    private readonly config: DynamicDialogConfig = inject(DynamicDialogConfig);
    private readonly professorService: ProfessorService = inject(ProfessorService);
    private readonly toastService: ToastService = inject(ToastService);

    protected meeting!: MeetingDTO;
    protected viewOnly: boolean = false;
    protected isEditing: boolean = false;
    protected feedback: string = '';
    protected gateResult: GateResultEnum | null = null;
    protected gateResultOptions = [
        { label: 'Aprovado', value: GateResultEnum.APPROVED },
        { label: 'Rejeitado', value: GateResultEnum.REJECTED }
    ];

    protected isGateMeeting: boolean = false;
    protected isSubmitting: boolean = false;

    ngOnInit(): void {
        this.meeting = this.config.data.meeting;
        this.viewOnly = this.config.data.viewOnly === true;
        this.isGateMeeting = this.meeting.type === MeetingTypeEnum.GATE;

        // Se há report, começa em modo visualização, senão começa em modo edição
        this.isEditing = !this.meeting.report;

        if (this.meeting.report) {
            // Populate fields with existing report data
            this.feedback = this.meeting.report.feedback;
            this.gateResult = this.meeting.report.gateResult || null;
        } else {
            console.log('Dialog is in EDIT mode - fields should be editable');
        }
    }

    protected submit(): void {
        if (!this.validateForm()) {
            return;
        }

        this.isSubmitting = true;

        const reportDTO: CreateMeetingReportDTO = {
            feedback: this.feedback
        };

        // Only add gateResult for Gate meetings
        if (this.isGateMeeting && this.gateResult) {
            reportDTO.gateResult = this.gateResult;
        }

        this.professorService.submitMeetingReport(this.meeting.id, reportDTO).subscribe({
            next: (updatedMeeting) => {
                console.log('Report submitted successfully:', updatedMeeting);
                this.toastService.success('Feedback enviado com sucesso!');
                this.dialogRef.close(true);
            },
            error: (error) => {
                console.error('Error submitting report:', error);
                const errorMsg = error?.error?.message || error?.message || 'Erro ao enviar feedback.';
                this.toastService.error(errorMsg);
                this.isSubmitting = false;
            }
        });
    }

    private validateForm(): boolean {
        if (!this.feedback || this.feedback.trim() === '') {
            this.toastService.warn('Por favor, forneça um feedback.');
            return false;
        }

        if (this.isGateMeeting && !this.gateResult) {
            this.toastService.warn('Por favor, selecione o resultado do Gate.');
            return false;
        }

        return true;
    }

    protected close(): void {
        this.dialogRef.close();
    }

    protected enableEditing(): void {
        this.isEditing = true;
    }

    protected cancelEditing(): void {
        this.isEditing = false;
        // Restaurar dados originais
        if (this.meeting.report) {
            this.feedback = this.meeting.report.feedback;
            this.gateResult = this.meeting.report.gateResult || null;
        }
    }

    protected getGateResultLabel(result: GateResultEnum | null): string {
        if (!result) return '-';
        return result === GateResultEnum.APPROVED ? 'Aprovado' : 'Rejeitado';
    }
}
