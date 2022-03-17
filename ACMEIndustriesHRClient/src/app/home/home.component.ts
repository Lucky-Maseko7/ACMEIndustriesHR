import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth.service';
import { EmployeeService } from '../Services/Employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  isManager: any;

  constructor(private service: EmployeeService, 
    public authService: AuthService) { }

  ngOnInit() {
     this.isManager = this.authService.isManagerFunction();
     this.authService.loggedIn();
  }

  getValues(){
    this.service.getAll().subscribe((data) => {
      console.log('Result - ', data);
      
    });
  }

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: any) {
    this.registerMode = registerMode;
  }

}
