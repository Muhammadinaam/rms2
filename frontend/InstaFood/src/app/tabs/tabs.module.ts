import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CommonServicesComponentsModule} from '../../../../admin/src/app/common-services-components/common-services-components.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { SettingsService } from '../../../../admin/src/app/common-services-components/services/settings.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage],
  providers: []
})
export class TabsPageModule {}
