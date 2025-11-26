import { Injectable } from '@angular/core';
import { BaseService } from '@/services/base-service';
import { Observable } from 'rxjs';
import { TimeSlot } from '@/pages/projects/entities/timeSlot';
import { Meeting, CreateMeetingRequest } from '@/pages/meetings/entities/meeting';
import { MeetingListing } from '@/pages/meetings/entities/meetingListing';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MeetingsService extends BaseService {
    public getTimeSlots(startDate: string, endDate: string): Observable<TimeSlot[]> {
        return this.http.get<TimeSlot[]>(`${this.getUrlEndPoint()}/timeSlots`, { params: { endDate, startDate } });
    }

    public createMeeting(projectId: string, meeting: CreateMeetingRequest): Observable<Meeting> {
        return this.http.post<Meeting>(`${environment.server}/projects/${projectId}/meetings`, meeting);
    }

    public cancelMeeting(meetingId: string): Observable<Meeting> {
        return this.http.patch<Meeting>(`${environment.server}/projects/meetings/${meetingId}/cancel`, {});
    }

    protected override getPathEndPoint(): string {
        return 'meetings';
    }
}
