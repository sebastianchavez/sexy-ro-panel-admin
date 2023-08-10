import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { LoggerService } from 'src/app/services/logger/logger.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  idLog: string = 'AdminComponent'
  stateSidemenu: boolean = false;
  constructor(
    private menuService: MenuService,
    private deviceService: DeviceService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.menuService.getStateSidemenu().subscribe((res: boolean) => {
      this.stateSidemenu = res
    })
    this.connectSocket()
  }


  async connectSocket(){
    try {
      const response = await this.deviceService.connectedSocket()
      this.logger.log(this.idLog, this.connectSocket.name, {info: 'Success', response})
    } catch (error) {
      this.logger.error(this.idLog, this.connectSocket.name, {info: 'Error', error})
    }

  }

  changeStateSidemenu(ev: boolean) {
    this.menuService.changeStateSidemenu(ev)
  }

}
