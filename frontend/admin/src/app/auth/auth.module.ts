import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbInputModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { AuthRoutingModule } from '../auth-routing/auth-routing.module';
import { LoginComponent } from './login/login.component';
import { CommonServicesComponentsModule } from '../common-services-components/common-services-components.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,

    NbAuthModule,
    
    AuthRoutingModule,
    CommonServicesComponentsModule
  ]
})
export class AuthModule { }
