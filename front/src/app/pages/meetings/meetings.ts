import { Component } from '@angular/core';
import { MeetingListing, MeetingStatusEnum, MeetingTypeEnum } from '@/pages/meetings/entities/meetingListing';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagProjectStatus } from '@/pages/projects/components/tag-project-status/tag-project-status';
import { TagMeetingStatus } from '@/pages/meetings/components/tag-meeting-status/tag-meeting-status';

@Component({
    selector: 'app-meetings',
    imports: [Button, TableModule, TagProjectStatus, TagMeetingStatus],
    templateUrl: './meetings.html',
    styleUrl: './meetings.scss'
})
export class Meetings {
    protected meetingsList: MeetingListing[] = [
        {
            id: '00000000-0000-0002-0001-000000000005',
            projectTitle: 'In-Progress G5 Project 2 (Soon)',
            professorName: 'Professor 1',
            scheduleDate: '2025-11-11',
            startTime: '10:00:00',
            endTime: '11:00:00',
            type: MeetingTypeEnum.GATE,
            status: MeetingStatusEnum.CANCELLED,
            stageGateNumber: 5
        },
        {
            id: '00000000-0000-0002-0001-000000000004',
            projectTitle: 'In-Progress G4 Project 1 (Soon)',
            professorName: 'Professor 1',
            scheduleDate: '2025-11-10',
            startTime: '10:00:00',
            endTime: '11:00:00',
            type: MeetingTypeEnum.STAGE,
            status: MeetingStatusEnum.PENDING,
            stageGateNumber: 4
        },
        {
            id: '00000000-0000-0002-0001-000000000002',
            projectTitle: 'In-Progress G2 Project 3 (Soon)',
            professorName: 'Professor 1',
            scheduleDate: '2025-11-09',
            startTime: '10:00:00',
            endTime: '11:00:00',
            type: MeetingTypeEnum.GATE,
            status: MeetingStatusEnum.PENDING_FEEDBACK,
            stageGateNumber: 2
        },
        {
            id: '00000000-0000-0002-0001-000000000006',
            projectTitle: 'In-Progress G6 Project 3 (Soon)',
            professorName: 'Professor 1',
            scheduleDate: '2025-11-09',
            startTime: '10:00:00',
            endTime: '11:00:00',
            type: MeetingTypeEnum.GATE,
            status: MeetingStatusEnum.COMPLETED,
            stageGateNumber: 6
        },
        {
            id: '00000000-0000-0002-0001-000000000001',
            projectTitle: 'In-Progress G1 Project 2 (Soon)',
            professorName: 'Professor 1',
            scheduleDate: '2025-11-07',
            startTime: '10:00:00',
            endTime: '11:00:00',
            type: MeetingTypeEnum.GATE,
            status: MeetingStatusEnum.LATE_FEEDBACK,
            stageGateNumber: 1
        },
        {
            id: '00000000-0000-0002-0001-000000000003',
            projectTitle: 'In-Progress G3-Late Project 1',
            professorName: 'Professor 1',
            scheduleDate: '2025-11-04',
            startTime: '10:00:00',
            endTime: '11:00:00',
            type: MeetingTypeEnum.GATE,
            status: MeetingStatusEnum.LATE_FEEDBACK,
            stageGateNumber: 3
        }
    ];
}
