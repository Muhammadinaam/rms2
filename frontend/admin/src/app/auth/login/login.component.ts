import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string = '';
  user:any = {
    'userid': '',
    'password': '',
  };
  submitted: boolean;

  constructor(private authService: AuthService, private router: Router) {
    
  }

  ngOnInit() {
  }

  login()
  {
    this.error = '';
    this.submitted = true;
    this.authService.login(this.user.userid, this.user.password)
      .subscribe(
        data => 
        {
          if(data.access_token != null)
          {
            this.router.navigate(['']);
          }
        },
        error => 
        {
          let message = error.status == 401 ? 'User ID or Password not correct' : error.statusText;
          this.error = message;
        }
      ).add(() =>
      {
        this.submitted = false;
      });
  }

}
