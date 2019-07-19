import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card/category-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CategoryCardComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    CategoryCardComponent
  ]
})
export class CommonThingsModule { }
