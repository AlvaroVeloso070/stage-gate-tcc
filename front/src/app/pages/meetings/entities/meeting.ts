import { MeetingTypeEnum, MeetingStatusEnum } from '@/pages/meetings/entities/meetingListing';

export interface Meeting {
    id?: string;
    projectId: string;
    professorId: string;
    scheduleDate: Date | string;
    startTime: string;
    endTime: string;
    type: MeetingTypeEnum;
    status: MeetingStatusEnum;
    stageGateNumber: number;
    participants?: string[];
}

export interface CreateMeetingRequest {
    scheduleDate: string; // formato YYYY-MM-DD
    timeSlotId: string;
    type: MeetingTypeEnum;
}
