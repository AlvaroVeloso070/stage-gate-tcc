import {Injectable} from "@angular/core";
import {BaseService} from "@/services/base-service";
import {Observable} from "rxjs";
import {ApiResponse} from "@/shared/dtos/api-response";
import {Gate, UpdateGateRequest} from "@/shared/dtos/gate";

@Injectable({
    providedIn: 'root'
})
export class GateService extends BaseService {
    public listGates(): Observable<ApiResponse<Gate[]>> {
        return this.http.get<ApiResponse<Gate[]>>(`${this.getUrlEndPoint()}`);
    }

    public updateGate(id: string, request: UpdateGateRequest): Observable<ApiResponse<Gate>> {
        return this.http.put<ApiResponse<Gate>>(`${this.getUrlEndPoint()}/${id}`, request);
    }

    protected override getPathEndPoint(): string {
        return 'gates'
    }
}
