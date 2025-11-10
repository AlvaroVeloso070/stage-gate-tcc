import { Component, input, InputSignal, signal } from '@angular/core';
import { Tag } from 'primeng/tag';
import { MeetingStatusEnum } from '@/pages/meetings/entities/meetingListing';

@Component({
    selector: 'tag-meeting-status',
    imports: [Tag],
    templateUrl: './tag-meeting-status.html',
    styleUrl: './tag-meeting-status.scss'
})
export class TagMeetingStatus {
    public status: InputSignal<MeetingStatusEnum> = input.required();
    protected tagValue = signal<string>('-');
    protected tagSeverity = signal<string>('primary');

    ngOnInit(): void {
        switch (this.status()) {
            case MeetingStatusEnum.COMPLETED:
                this.tagValue.set('Completa');
                this.tagSeverity.set('success');
                break;
            case MeetingStatusEnum.PENDING:
                this.tagValue.set('Pendente');
                this.tagSeverity.set('info');
                break;
            case MeetingStatusEnum.PENDING_FEEDBACK:
                this.tagValue.set('Feedback pendente');
                this.tagSeverity.set('primary');
                break;
            case MeetingStatusEnum.LATE_FEEDBACK:
                this.tagValue.set('Feedback atrasado');
                this.tagSeverity.set('warn');
                break;
            case MeetingStatusEnum.CANCELLED:
                this.tagValue.set('Cancelado');
                this.tagSeverity.set('danger');
                break;
        }
    }
}
