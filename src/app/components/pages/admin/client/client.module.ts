import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component'
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    ClientRoutingModule
  ]
})
export class ClientModule { }
