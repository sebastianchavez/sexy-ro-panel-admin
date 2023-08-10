import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessLockComponent } from './process-lock.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessLockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessLockRoutingModule { }
