export interface IRequestUpdateEvent {
    idEvent: number;
    title: string;
    description: string;
    type: string;
    days: number;
    startHour: number;
    endHour: number;
}