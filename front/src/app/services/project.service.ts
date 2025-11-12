import { Injectable } from '@angular/core';
import { BaseService } from '@/services/base-service';
import { Observable } from 'rxjs';
import { CoordinationMetrics } from '@/pages/dashboard/entities/coordination-metrics';
import { Project } from '@/pages/projects/entities/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService{

    public getCoordinationMetrics() : Observable<Project> {
        return this.http.get<Project>(`${this.getUrlEndPoint()}/projects/metrics`);
    }

    protected getPathEndPoint(): string {
        return 'projects';
    }
}
