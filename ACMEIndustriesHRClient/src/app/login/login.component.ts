import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../Services/Alertify.service';
import { AuthService } from '../Services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: any = {};

  constructor(private  authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  login() {
    this.authService.login(this.model).subscribe((data) => {
      // this.alertify.success('Logged in successfully');
    }, (error: any) => {
      this.alertify.error(error);
      console.log("Error: " + JSON.stringify(error));
    }, 
    () => {
      // this.authService.loggedIn();
      this.router.navigate(['/employees']);
    }
    );
  }
  

}
