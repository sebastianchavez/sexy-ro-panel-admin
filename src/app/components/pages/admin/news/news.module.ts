import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ]
})
export class NewsModule { }
