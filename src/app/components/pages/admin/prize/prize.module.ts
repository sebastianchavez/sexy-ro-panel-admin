import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrizeRoutingModule } from './prize-routing.module';
import { PrizeComponent } from './prize.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    PrizeComponent
  ],
  imports: [
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule,
    PrizeRoutingModule,
    NgSelectModule,
    FormsModule,
  ]
})
export class PrizeModule { }
