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
            this.authService.getLoggedInUserFromBackend()
              .subscribe(user => {
                this.authService.user = user
                this.router.navigate(['']);
              }, 
              error => {
                console.log(error);
                alert('Error occurred in getting user information');
              })
          }
        },
        error => 
        {
          let message = error.status == 401 ? 'User ID or Password not correct OR User ID not activated' : error.statusText;
          this.error = message;
        }
      ).add(() =>
      {
        this.submitted = false;
      });
  }

}
