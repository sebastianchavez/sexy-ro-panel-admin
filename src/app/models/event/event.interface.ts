export interface IEvent {
    idEvent?: number;
    title: string;
    type: 'automatic' | 'manual'
    description: string;
    days: number;
    startHour: number;
    endHour: number;
}