import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { AdminsComponent } from './admins.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AdminsComponent
  ],
  imports: [
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule,
    AdminsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AdminsModule { }
