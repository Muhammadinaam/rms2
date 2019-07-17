import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import * as moment from "moment";
import { Router } from '@angular/router';
import { BaseEndPointService } from '../../common-services-components/services/base-end-point.service'
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any = null;

  constructor(private http: HttpClient, private router: Router) { }
  
  login(userID: string, password: string): any {

    let clientInfo = BaseEndPointService.getClientInfo();

    return this.http.post<any>(BaseEndPointService.getBaseEndPoint() + '/oauth/token', 
    {
      'grant_type': 'password',
      'client_id': clientInfo.id,
      'client_secret': clientInfo.secret,
      'username': userID,
      'password': password,
      'scope': '',
    })
    .do(res => this.setSession(res)) 
    .shareReplay();
  }

  public async getLoggedInUser(){
    if(this.user == null) { 
      console.log('getting from db');
      this.user = await this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/logged-in-user').toPromise();
    }
    
    return this.user;
  }

  public async loggedInUserHasPermission(permission)
  {
    if(this.user == null) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await this.getLoggedInUser();
    }

    //console.log(this.user);
    if(this.user.user_type == 'Super Admin') {
      return true;
    }
    else
    {
      let hasPermision = false;
      this.user.user_permissions.forEach(user_permission => {
        if(user_permission.permission_idt == permission) {
          
          hasPermision = true;
        }
      });
      return hasPermision;
    }
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expires_in,'second');

    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }          

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      this.user = null;
      this.redirectToLogin();
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }  

  getToken(): any {
    let token = '';
    if(this.isLoggedIn())
    {
      token = localStorage.getItem("id_token");
    }
    return token;
  }

  redirectToLogin(): any {
    this.router.navigate(['/auth/login']);
  }
}
