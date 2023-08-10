import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ],
  bootstrap:[EventsComponent]
})
export class EventsModule { }
