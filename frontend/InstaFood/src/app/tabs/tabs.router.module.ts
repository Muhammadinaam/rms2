import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-home',
        children: [
          {
            path: '',
            loadChildren: '../tabs/tab-home/tab-home.module#TabHomeModule'
          }
        ]
      },
      {
        path: 'tab-items',
        children: [
          {
            path: '',
            loadChildren: '../tabs/tab-items/tab-items.module#TabItemsModule'
          }
        ]
      },
      {
        path: 'tab-order',
        children: [
          {
            path: '',
            loadChildren: '../tabs/tab-order/tab-order.module#TabOrderModule'
          }
        ]
      },
      {
        path: 'tab-track-order',
        children: [
          {
            path: '',
            loadChildren: '../tabs/tab-track-order/tab-track-order.module#TabTrackOrderModule'
          }
        ]
      },
      {
        path: 'tab-track-order/:tracking_number',
        children: [
          {
            path: '',
            loadChildren: '../tabs/tab-track-order/tab-track-order.module#TabTrackOrderModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab-home',
        pathMatch: 'full'
      },
      // {
      //   path: '**',
      //   redirectTo: '/tabs/tab-home',
      //   pathMatch: 'full'
      // }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-home',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   redirectTo: '/tabs/tab-home',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
