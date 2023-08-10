import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'process-lock',
        loadChildren: () => import('./process-lock/process-lock.module').then(m => m.ProcessLockModule)
      },
      {
        path: 'prizes',
        loadChildren: () => import('./prize/prize.module').then(m => m.PrizeModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'prizes-pvp',
        loadChildren: () => import('./prize-pvp/prize-pvp.module').then(m => m.PrizePvpModule)
      },
      {
        path: 'devices',
        loadChildren: () => import('./devices/devices.module').then(m => m.DevicesModule)
      },
      {
        path: 'vote',
        loadChildren: () => import('./vote/vote.module').then(m => m.VoteModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
