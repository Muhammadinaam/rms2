import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabCategoriesComponent } from './tab-categories/tab-categories.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonServicesComponentsModule } from '../../../../../admin/src/app/common-services-components/common-services-components.module';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { CommonThingsModule } from '../common-things/common-things.module';

@NgModule({
  declarations: [TabCategoriesComponent, CategoryItemsComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CommonServicesComponentsModule,
    CommonThingsModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: TabCategoriesComponent 
      },
      {
        path: 'category/:id/items',
        component: CategoryItemsComponent
      }
    ]),
  ]
})
export class TabItemsModule { }
