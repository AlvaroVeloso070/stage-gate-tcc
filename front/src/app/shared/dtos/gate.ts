export interface Gate {
    id: string;
    number: number;
    name: string;
    hasDeliverable: boolean;
}

export interface UpdateGateRequest {
    name: string;
    hasDeliverable: boolean;
}
