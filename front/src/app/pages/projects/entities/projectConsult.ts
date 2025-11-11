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
    status: string;
    startDate: string;
    groupMembers: User[];
    gates: Gate[];
}

export interface Report {
    id: string;
    feedback: string;
    gateResult: string;
    reportDate: string; // formato ISO
}

export interface MeetingConsult {
    id: string;
    type: string;
    professor: User;
    stageGateNumber: number;
    participants: User[];
    scheduleDate: string;
    startTime: string;
    endTime: string;
    status: string;
    report: Report;
    project: Project;
}
