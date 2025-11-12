import { Injectable } from '@angular/core';
import { BaseService } from '@/services/base-service';
import { CoordinationMetrics } from '@/pages/dashboard/entities/coordination-metrics';
import { Observable } from 'rxjs';
import { Project } from '@/pages/projects/entities/project';
import { ProjectListing } from '@/pages/projects/entities/projectListing';

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

    protected override getPathEndPoint(): string {
        return 'coordination'
    }
}
