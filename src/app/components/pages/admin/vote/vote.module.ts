import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoteRoutingModule } from './vote-routing.module';
import { VoteComponent } from './vote.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    VoteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    VoteRoutingModule
  ]
})
export class VoteModule { }
