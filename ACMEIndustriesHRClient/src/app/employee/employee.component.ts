import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Employee } from '../Interfaces/Employee';
import { AuthService } from '../Services/Auth.service';
import { EmployeeService } from '../Services/Employee.service';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee = {
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

  id: any;

  isManager: any;

  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private route: ActivatedRoute, private router: Router, 
    private employeeService: EmployeeService, private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {

    this.isManager = this.authService.isManagerFunction();

    this.id = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployeeById(this.id).subscribe((data: any) => {
      
    console.log('Employee', data);

      this.employee.UserName = data.UserName;
      this.employee.FullName = data.FullName;
      this.employee.Gender = data.Gender;
      this.employee.DateOfBirth = data.DateOfBirth;
      this.employee.CurrentProjects = data.CurrentProjects;
      this.employee.ReportingLine = data.ReportingLine;
      this.employee.DateOfBirth = data.DateOfBirth;
      this.employee.PhotoUrl = data.PhotoUrl === undefined || data.PhotoUrl === '' ? '' : environment.imagePath + data.PhotoUrl;
      this.employee.BusinessRole = data.BusinessRole;
      this.employee.Address = data.Address;

    });

  }

  cancel() {
    this.router.navigate(['/employees']);
  }


  editProfile(){
    console.log('Edit clicked!');

    this.dialog.open(UpdateEmployeeComponent, {
      data: { employee : this.employee }
    });

  }

  isManagerFunction(employee: any) {
    if(employee.BusinessRole === 'Manager') return true;
  }

}
