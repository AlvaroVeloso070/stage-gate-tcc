import { Injectable } from '@angular/core';
import { BaseService } from '@/services/base-service';
import { CoordinationMetrics } from '@/pages/dashboard/entities/coordination-metrics';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoordinationService extends BaseService {

    public getCoordinationMetrics() : Observable<CoordinationMetrics> {
        return this.http.get<CoordinationMetrics>(`${this.getUrlEndPoint()}/projects/metrics`);
    }

    protected override getPathEndPoint(): string {
        return 'coordination'
    }
}
