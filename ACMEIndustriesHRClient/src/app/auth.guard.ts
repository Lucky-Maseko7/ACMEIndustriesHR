import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from './Services/Alertify.service';
import { AuthService } from './Services/Auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('You shall not pass!!');
    this.router.navigate(['/home']);
    return false;
  }
}