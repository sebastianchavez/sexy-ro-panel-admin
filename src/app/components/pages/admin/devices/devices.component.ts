import { Component, OnInit, TemplateRef } from '@angular/core';
import { DeviceService } from 'src/app/services/device/device.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { IDevice } from 'src/app/models/device/device.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  idLog: string = 'DevicesComponent'
  devices: IDevice[] = []
  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private menuService: MenuService,
    private deviceService: DeviceService,
  ) { }

  ngOnInit(): void {
    this.menuService.setTitlePage('Dispositivos')
    this.getDevices()
    this.userIsUpdate()
  }

  getDevices(){
    this.deviceService.getDevices()
      .subscribe((res: any) => {
        this.devices = res
      })
  }

  userIsUpdate(){
    this.deviceService.userIsUpdated()
      .subscribe((res: any) => {
        const dev = this.devices.find(x => x.device_id = res.device_id)
        if(dev){
          this.devices.forEach((x: IDevice,i: number) => {
            if(x.device_id == dev.device_id){
              this.devices[i] = res
            }
          })
        } else {
          this.devices.push(res)
        }
      })
  }

  async openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
