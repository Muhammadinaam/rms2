import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivateMethod();
  }
  
  constructor(private authService: AuthService, private router: Router) {  }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivateMethod();
  }

  canActivateMethod()
  {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    console.log('navigate-login');
    // navigate to login page
    this.authService.redirectToLogin();
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}
  