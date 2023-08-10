export interface IRequestSaveNews {
    image?: string;
    inWeb: boolean;
    inClient: boolean;
    inSlide: boolean;
    title: string;
    description: string;
    link?: string;
    startDate?: Date | null;
    endDate?: Date | null;
}