import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../Services/Alertify.service';
import { AuthService } from '../Services/Auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  model: any = {};
  photoUrl: string | undefined;
  
  isManager: any;

  constructor(private  authService: AuthService, private alertify: AlertifyService, private router: Router) {
    
   }

  ngOnInit() {

    this.isManager = this.authService.isManagerFunction();
    this.model = this.authService.getEmployee();
    
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
    // this.alertify.message('Logged out');
  }

}
