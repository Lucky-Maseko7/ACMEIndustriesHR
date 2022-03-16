import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/Auth.service';
import { EmployeeService } from '../Services/Employee.service';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: any;

  employee: {
    UserName: '',
    password: '',
    FullName: '',
    Gender: '',
    DateOfBirth:'',
    CurrentProjects: '',
    ReportingLine:'',
    BusinessRole:'',
    Address:'',
    PhotoUrl:'',
  }

  @ViewChild(MatSort) sort: MatSort | undefined;
  
  constructor(private router: Router, private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
    this.employee = this.authService.getEmployee();
  }

  editProfile(){

    this.dialog.open(UpdateEmployeeComponent, {
      data: { employee : this.employee }
    });

  }

  cancel() {
    this.router.navigate(['/employees']);
  }

  isManagerFunction(employee: any) {
    if(employee.BusinessRole === 'Manager') return true;
  }
}
