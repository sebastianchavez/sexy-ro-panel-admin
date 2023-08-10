import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrizePvpComponent } from './prize-pvp.component';

const routes: Routes = [
  {
    path: '',
    component: PrizePvpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrizePvpRoutingModule { }
