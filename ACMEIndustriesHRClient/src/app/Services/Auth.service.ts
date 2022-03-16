import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Employee } from '../Interfaces/Employee';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentEmployee: any;
  photoUrl = new BehaviorSubject<string>('../../assets/employee.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient, private router: Router) { this.currentEmployee = localStorage.getItem('Employee'); }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model,).pipe(
      map((response: any) => {
        const data = response;
        if (data) {
          
          localStorage.setItem('Token', data.Token);
          localStorage.setItem('Employee', JSON.stringify(data.Employee));
          this.decodedToken = this.jwtHelper.decodeToken(data.Token);
          this.currentEmployee = data.Employee;
          
        }
      })
    );
  }

  register(employee: Employee) {
    return this.http.post(this.baseUrl + 'register', employee);
  }

  loggedIn() {

    let token = localStorage.getItem('Token');
    
    if(token !== null){
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

  getEmployee(){
    let employee = localStorage.getItem('Employee');
    if (employee  !== null){
      return JSON.parse(employee);
    }
  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('Employee');
    this.router.navigate(['']);

  }

  isManagerFunction() {

    let currentEmployee = this.getEmployee();

    if(currentEmployee.BusinessRole === 'Manager') return true;
  }

}
