export interface IDevice {
    device_id: number;
    mac: string;
    ip: string;
    os: string;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
    typeUser: string; // user - admin
    socketId: string;
    is_connected: boolean;
}