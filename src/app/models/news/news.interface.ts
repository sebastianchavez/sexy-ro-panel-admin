export interface INews {
    idNews?: number;
    image: string;
    inWeb: boolean;
    inClient: boolean;
    inSlide: boolean;
    link:string;
    startDate: Date | string;
    endDate: Date | string;
    title: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}