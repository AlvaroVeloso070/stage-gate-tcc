import { Injectable } from '@angular/core';
import { BaseService } from '@/services/base-service';
import { Observable } from 'rxjs';
import { User, CreateUserRequest, UpdateUserRequest } from '../pages/users/entities/user';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {
    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.getUrlEndPoint()}`);
    }

    public getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.getUrlEndPoint()}/${id}`);
    }

    public createUser(user: CreateUserRequest): Observable<User> {
        return this.http.post<User>(`${this.getUrlEndPoint()}`, user);
    }

    public updateUser(id: string, user: UpdateUserRequest): Observable<User> {
        return this.http.put<User>(`${this.getUrlEndPoint()}/${id}`, user);
    }

    public deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(`${this.getUrlEndPoint()}/${id}`);
    }

    protected getPathEndPoint(): string {
        return 'users';
    }
}
