import {Injectable} from '@angular/core';
import {BaseService} from '@/services/base-service';
import {Observable} from 'rxjs';
import {TimeSlot} from '@/pages/projects/entities/timeSlot';
import {CreateMeetingRequest, Meeting} from '@/pages/meetings/entities/meeting';
import {environment} from '../../environments/environment';
import {MeetingConsult} from "@/pages/projects/entities/project";

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

    public getByProfessorId(id: string) : Observable<MeetingConsult[]> {
        return this.http.get<MeetingConsult[]>(`${this.getUrlEndPoint()}/professor/${id}`)
    }

    protected override getPathEndPoint(): string {
        return 'meetings';
    }
}
