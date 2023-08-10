export interface IQueryGetNews {
    limit: number;
    page: number;
    inWeb: boolean;
    inClient: boolean;
    inSlide: boolean;
    title?: string;
    startDate?: Date;
    endDate?: Date;
}