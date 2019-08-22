import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabOrderPageComponent } from './tab-order-page/tab-order-page.component';
import { RouterModule } from '@angular/router';
import { CommonServicesComponentsModule } from '../../../../../admin/src/app/common-services-components/common-services-components.module';

@NgModule({
  declarations: [TabOrderPageComponent],
  imports: [
    IonicModule,
    CommonModule,
    CommonServicesComponentsModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: TabOrderPageComponent 
      }
    ]),
  ]
})
export class TabOrderModule { }
