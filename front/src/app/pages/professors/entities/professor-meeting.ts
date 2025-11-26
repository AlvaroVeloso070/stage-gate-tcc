import { MeetingTypeEnum, MeetingStatusEnum } from '@/pages/meetings/entities/meetingListing';

export interface MeetingDTO {
    id: string;
    type: MeetingTypeEnum;
    professor: UserDTO;
    stageGateNumber: number;
    participants: UserDTO[];
    scheduleDate: string;
    startTime: string;
    endTime: string;
    status: MeetingStatusEnum;
    report: MeetingReportDTO | null;
    project: ProjectDTO;
}

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    type: string;
}

export interface ProjectDTO {
    id: string;
    title: string;
    description: string;
}

export interface MeetingReportDTO {
    id: string;
    feedback: string;
    gateResult: GateResultEnum | null;
    reportDate: string;
}

export enum GateResultEnum {
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export interface CreateMeetingReportDTO {
    feedback: string;
    gateResult?: GateResultEnum;
}
