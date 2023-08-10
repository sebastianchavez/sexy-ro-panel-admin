import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [DevicesComponent],
  imports: [
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    CommonModule,
    DevicesRoutingModule
  ]
})
export class DevicesModule { }
