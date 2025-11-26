import { Injectable } from '@angular/core';
import { BaseService } from '@/services/base-service';
import { CoordinationMetrics } from '@/pages/dashboard/entities/coordination-metrics';
import { Observable } from 'rxjs';
import {Project, UserTypeEnum} from '@/pages/projects/entities/project';
import { ProjectListing } from '@/pages/projects/entities/projectListing';
import { MeetingListing } from '@/pages/meetings/entities/meetingListing';
import {User} from "@/pages/users/entities/user";

@Injectable({
    providedIn: 'root'
})
export class CoordinationService extends BaseService {

    public getCoordinationMetrics() : Observable<CoordinationMetrics> {
        return this.http.get<CoordinationMetrics>(`${this.getUrlEndPoint()}/projects/metrics`);
    }

    public getAllProjects() : Observable<ProjectListing[]> {
        return this.http.get<ProjectListing[]>(`${this.getUrlEndPoint()}/projects`);
    }

    public getAllMeetings() : Observable<MeetingListing[]> {
        return this.http.get<MeetingListing[]>(`${this.getUrlEndPoint()}/projects/meetings`);
    }

    public getUsersByType(userType : UserTypeEnum): Observable<User[]> {
        return this.http.get<User[]>(`${this.getUrlEndPoint()}/users`, {params: {userType}});
    }

    protected override getPathEndPoint(): string {
        return 'coordination'
    }
}
