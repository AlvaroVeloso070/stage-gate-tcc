import { Injectable } from '@angular/core';
import { BaseService } from '@/services/base-service';
import { Observable } from 'rxjs';
import { TimeSlot } from '@/pages/projects/entities/timeSlot';

@Injectable({
    providedIn: 'root'
})
export class MeetingsService extends BaseService {

    public getTimeSlots(startDate : string, endDate : string) : Observable<TimeSlot[]>{
        return this.http.get<TimeSlot[]>(`${this.getUrlEndPoint()}/timeSlots`, {params: {endDate, startDate}})
    }

    protected override getPathEndPoint(): string {
        return 'meetings';
    }
}
