import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export abstract class BaseService {

    protected http : HttpClient = inject(HttpClient);

    protected abstract getPathEndPoint(): string;

    protected getUrlEndPoint(): string {
        return environment.server + '/' + this.getPathEndPoint();
    }
}
