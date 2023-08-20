export interface IRequestRegisterAdmin {
    email: string;
    password: string;
}

export interface IRequestLoginAdmin {
    email: string;
    password: string;
}

export interface IAdmin {
    idAdmin?: number;
    email: string;
    isAvailable: boolean;
}

