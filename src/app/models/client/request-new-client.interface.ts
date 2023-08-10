import { IUpdate } from "./update.interface";

export interface IRequestNewClient {
    version: string;
    description: string;
    files: {
        name: string;
        url: string;
    }[];
    updates?: IUpdate[]
}