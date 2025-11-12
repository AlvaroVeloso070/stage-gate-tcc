export interface User {
    id: string;
    name: string;
    email: string;
    type: UserTypeEnum;
}

export enum UserTypeEnum {
    PROFESSOR = 'PROFESSOR',
    STUDENT =  'STUDENT',
    COORDINATOR =  'COORDINATOR'
}

export interface Gate {
    id: string;
    number: number;
    name: string;
    dueDate: string; // formato "YYYY-MM-DD"
    approved: boolean;
}

export interface Project {
    id: string;
    title: string;
    researchQuestion: string;
    status: ProjectStatus;
    startDate: string;
    groupMembers: User[];
    gates: Gate[];
}

export enum ProjectStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

export interface Report {
    id: string;
    feedback: string;
    gateResult: GateResultEnum;
    reportDate: string; // formato ISO
}

export interface MeetingConsult {
    id: string;
    type: MeetingType;
    professor: User;
    stageGateNumber: number;
    participants: User[];
    scheduleDate: string;
    startTime: string;
    endTime: string;
    status: string;
    report: Report;
}

export enum MeetingType {
    GATE = 'GATE',
    STAGE = 'STAGE'
}

export enum GateResultEnum {
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    PENDING = 'PENDING'
}

