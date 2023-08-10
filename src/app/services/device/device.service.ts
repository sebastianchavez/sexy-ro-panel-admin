import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { IRequestConnectSocket } from 'src/app/models/device/request-connect-socket.interface';
import { BehaviorSubject, map } from 'rxjs';
import { IDevice } from 'src/app/models/device/device.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  // devices?: BehaviorSubject<IDevice[] | any> = new BehaviorSubject([]);

  constructor(
    private socket: Socket,
    private http: HttpClient,
  ) { }

  connectedSocket(){
    this.socket.on('connect', () => {
      localStorage.setItem('socket', this.socket.ioSocket.id)
    })
    return this.socket.connect()
  }

  isConnect(request: IRequestConnectSocket){
    return this.socket.emit('isConnected', request)
  }

  getDevices(){
    this.socket.emit('getDevices')
    return this.socket.fromEvent('devices')
  }

  userIsUpdated(){
    return this.socket.fromEvent('userUpdated')
  }

  getProcesses(socketId: string){
    this.socket.emit('gerProcesses', socketId)
    return this.socket.fromEvent('userProcess')
  }
}
