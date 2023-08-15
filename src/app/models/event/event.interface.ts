export interface IEvent {
    idEvent?: number;
    title: string;
    type: 'woe'
    description: string;
    days: number;
    startHour: number;
    endHour: number;
}