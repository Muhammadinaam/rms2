import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './pages/menu/menu.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { Nav2Component } from './components/nav2/nav2.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AddToOrderComponent } from './components/add-to-order/add-to-order.component';
import { OrderModalComponent } from './components/order-modal/order-modal.component';
import { TrackOrderComponent } from './pages/track-order/track-order.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './components/map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SettingsService } from './services/settings.service';

export function initializeApp1(settingsService: SettingsService) {
  return (): Promise<any> => { 
    return settingsService.Init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    CategoryCardComponent,
    Nav2Component,
    LoadingComponent,
    AddToOrderComponent,
    OrderModalComponent,
    TrackOrderComponent,
    FeedbackComponent,
    ContactComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBybYVclV94ibbDRa2VR4Tr95TDeQJIQTk'
    })
  ],
  providers: [
    SettingsService,
    { provide: APP_INITIALIZER,useFactory: initializeApp1, deps: [SettingsService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
