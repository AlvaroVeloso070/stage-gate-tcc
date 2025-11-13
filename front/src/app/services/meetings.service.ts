import { Injectable } from '@angular/core';
import { BaseService } from '@/services/base-service';

@Injectable({
    providedIn: 'root'
})
export class MeetingsService extends BaseService {


    protected override getPathEndPoint(): string {
        throw new Error('meetings');
    }
}
