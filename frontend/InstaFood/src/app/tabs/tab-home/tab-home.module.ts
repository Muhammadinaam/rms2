import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabHomePageComponent } from './tab-home-page/tab-home-page.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonServicesComponentsModule } from '../../../../../admin/src/app/common-services-components/common-services-components.module';
import { CommonThingsModule } from '../common-things/common-things.module';

@NgModule({
  declarations: [
    TabHomePageComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabHomePageComponent }]),
    CommonServicesComponentsModule,
    CommonThingsModule
  ]
})
export class TabHomeModule { }
