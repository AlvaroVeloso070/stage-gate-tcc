import { Injectable } from '@angular/core';
import { BaseService } from '@/services/base-service';
import { Observable } from 'rxjs';
import { CoordinationMetrics } from '@/pages/dashboard/entities/coordination-metrics';
import { MeetingConsult, Project } from '@/pages/projects/entities/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService{

    public getProjectById(id : string) : Observable<Project> {
        return this.http.get<Project>(`${this.getUrlEndPoint()}/${id}`);
    }

    public getAllProjectMeetings(id : string) : Observable<MeetingConsult[]> {
        return this.http.get<MeetingConsult[]>(`${this.getUrlEndPoint()}/${id}/meetings`);
    }

    public scheduleMeeting(projectId : number, data : any) {
        return this.http.post<any>(`${this.getUrlEndPoint()}/${projectId}/meetings`, data);
    }

    public createProject(project : Project){
        return this.http.post<Project>(this.getUrlEndPoint(), project);
    }

    protected getPathEndPoint(): string {
        return 'projects';
    }
}
