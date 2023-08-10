import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrizePvpRoutingModule } from './prize-pvp-routing.module';
import { PrizePvpComponent } from './prize-pvp.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrizePvpComponent
  ],
  imports: [
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgSelectModule,
    FormsModule,
    CommonModule,
    PrizePvpRoutingModule
  ]
})
export class PrizePvpModule { }
