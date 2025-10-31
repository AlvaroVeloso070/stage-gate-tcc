export interface ProjectListing {
    title : string;
    groupMembers: string[];
    currentGateNumber: number;
    dueDate : string | undefined;
    dueDateStatus : DueDateStatus | undefined;
}

export enum DueDateStatus {
    ON_TIME= 'ON_TIME',
    WARNING = 'WARNING',
    OVERDUE = 'OVERDUE'
} {}
