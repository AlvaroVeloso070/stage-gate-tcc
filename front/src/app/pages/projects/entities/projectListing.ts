export interface ProjectListing {
    id : string;
    title : string;
    groupMembers: string[];
    currentGateNumber: number;
    dueDate : Date | undefined;
    dueDateStatus : DueDateStatus | undefined;
}

export enum DueDateStatus {
    ON_TIME= 'ON_TIME',
    WARNING = 'WARNING',
    OVERDUE = 'OVERDUE'
} {}
