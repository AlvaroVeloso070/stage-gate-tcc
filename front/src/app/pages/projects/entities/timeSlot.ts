import {User} from "@/pages/projects/entities/project";

export interface TimeSlot {
    scheduleDate: string;
    id: string;
    startTime: string;
    endTime: string;
    dayOfWeek: DayOfWeek;
    professor: User;
    available: boolean;
}

export enum DayOfWeek {
    SUNDAY = "SUNDAY",
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY"
}
