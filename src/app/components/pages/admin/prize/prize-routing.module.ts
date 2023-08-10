import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrizeComponent } from './prize.component';

const routes: Routes = [
  {
    path: '',
    component: PrizeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrizeRoutingModule { }
