import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  hide = true;

  loginForm: FormGroup;

  constructor(private  authService: AuthService, private alertify: AlertifyService, private router: Router, private fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
      });
   }

  login() {
    this.authService.login(this.loginForm.value).subscribe((data) => {
      // this.alertify.success('Logged in successfully');
    }, (error: any) => {
      this.alertify.error(error);
      
    }, 
    () => {
      // this.authService.loggedIn();
      this.router.navigate(['/employees']);
    }
    );
  }
  

}
