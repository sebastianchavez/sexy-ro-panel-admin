import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu.component';
import { RouterModule } from '@angular/router';
import { ResponsiveSidemenuComponent } from './responsive-sidemenu/responsive-sidemenu.component';
import { NormalSidemenuComponent } from './normal-sidemenu/normal-sidemenu.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    SidemenuComponent,
    ResponsiveSidemenuComponent,
    NormalSidemenuComponent
  ],
  exports: [
    SidemenuComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    RouterModule,
    CommonModule,
    AccordionModule.forRoot()
  ]
})
export class SidemenuModule { }
