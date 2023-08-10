export interface IRequestUpdateNews {
    idNews: number;
    image?: string;
    inWeb: boolean;
    inClient: boolean;
    inSlide: boolean;
    title: string;
    description: string;
    link?: string;
    startDate?: Date;
    endDate?: Date;
}