import { Injectable } from '@angular/core';
import { BaseService } from '@/services/base-service';
import { Observable } from 'rxjs';
import { MeetingDTO, CreateMeetingReportDTO } from '@/pages/professors/entities/professor-meeting';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfessorService extends BaseService {
    public getProfessorMeetings(professorId: string): Observable<MeetingDTO[]> {
        return this.http.get<MeetingDTO[]>(`${this.getUrlEndPoint()}/${professorId}/meetings`);
    }

    public submitMeetingReport(meetingId: string, reportDTO: CreateMeetingReportDTO): Observable<MeetingDTO> {
        return this.http.post<MeetingDTO>(`${environment.server}/projects/meetings/${meetingId}/report`, reportDTO);
    }

    protected override getPathEndPoint(): string {
        return 'professor';
    }
}
