export interface IPrizeConnection {
    day: number;
    prize: {
        prizeconnection_id: number;
        id: number;
        name_aegis: string;
        name_english: string;
        quantity: number;
    }[]
}
