import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { TrackOrderComponent } from './pages/track-order/track-order.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'menu/:category_name',
    component: MenuComponent,
  },
  {
    path: 'track-order',
    component: TrackOrderComponent,
  },
  {
    path: 'track-order/:tracking_number',
    component: TrackOrderComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
