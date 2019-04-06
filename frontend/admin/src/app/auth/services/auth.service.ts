import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../services/base-end-point.service';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import * as moment from "moment";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expires_in,'second');

    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }          

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
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
