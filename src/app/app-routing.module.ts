import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/pages/admin/admin.component';
import { IsLoginGuard } from './guards/isLogin/is-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/pages/admin/admin.module').then(m => m.AdminModule),
    canActivate:[IsLoginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./components/pages/auth/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
