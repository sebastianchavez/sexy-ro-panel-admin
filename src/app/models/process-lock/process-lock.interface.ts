export interface IProcessLock {
    idProcesslock: number;
    typeValidation: string | string[];
    value: string;
    range: number;
    created_at: Date;
    updated_at: Date;
}   