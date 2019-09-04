import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TrackOrderPageComponent } from './track-order-page/track-order-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TrackOrderPageComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(
      [
        { path: '', component: TrackOrderPageComponent },
        { path: '/:order_id', component: TrackOrderPageComponent }
      ]),
  ]
})
export class TabTrackOrderModule { }
