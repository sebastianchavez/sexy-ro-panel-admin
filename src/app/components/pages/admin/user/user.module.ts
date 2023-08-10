import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ]
})
export class UserModule { }
