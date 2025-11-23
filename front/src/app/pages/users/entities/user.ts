import {UserTypeEnum} from "@/pages/projects/entities/project";

export interface User {
    id: string;
    name: string;
    email: string;
    type: UserTypeEnum;
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
