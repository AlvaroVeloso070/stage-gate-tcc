export interface MeetingListing {
    id : string;
    projectTitle : string;
    professorName : string;
    scheduleDate : Date;
    startTime : string;
    endTime : string;
    type : MeetingTypeEnum;
    status: MeetingStatusEnum;
    stageGateNumber : number;
}

export enum MeetingTypeEnum{
    GATE = 'GATE',
    STAGE = 'STAGE'
}

export enum MeetingStatusEnum{
    PENDING = 'PENDING',
    PENDING_FEEDBACK = 'PENDING_FEEDBACK',
    LATE_FEEDBACK = 'LATE_FEEDBACK',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}
