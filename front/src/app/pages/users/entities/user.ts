export interface User {
    id: string;
    name: string;
    email: string;
    type: UserTypeEnum;
}

export enum UserTypeEnum {
    PROFESSOR = 'PROFESSOR',
    STUDENT = 'STUDENT',
    COORDINATOR = 'COORDINATOR'
}

export interface CreateUserRequest {
    name: string;
    email: string;
    type: UserTypeEnum;
}

export interface UpdateUserRequest {
    name: string;
    email: string;
    type: UserTypeEnum;
}
