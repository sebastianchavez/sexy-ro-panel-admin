import { IAlternative } from "./alternative.interface";

export interface IQuestion {
    idQuestion?: number;
    question: string;
    startDate?: Date;
    endDate?: Date;
    idServer: number | any;
    alternatives: IAlternative[];
}