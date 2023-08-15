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
    private http: HttpClient,
  ) { }

}
