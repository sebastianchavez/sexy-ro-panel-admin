import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessLockRoutingModule } from './process-lock-routing.module';
import { ProcessLockComponent } from './process-lock.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ProcessLockComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ProcessLockRoutingModule,
    NgSelectModule
  ]
})
export class ProcessLockModule { }
