export interface IQueryProcessLock {
    name?: string;
    pid?: number;
    size?: number;
    type?: string;
    limit: number;
    page: number;
}