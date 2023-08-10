import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidemenuModule } from '../../common/sidemenu/sidemenu.module';
import { NavbarModule } from '../../common/navbar/navbar.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    SidemenuModule,
    NavbarModule,
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
