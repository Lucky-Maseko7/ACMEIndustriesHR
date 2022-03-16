import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../Services/Employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  employee = {
    username: '',
    password: '',
    fullName: '',
    gender: '',
    dateOfBirth: '',
    currentProjects:'',
    reportingLine:'',
    businessRole:'',
    address:'',
    photoUrl:'',
  }

  id: any;
  constructor(private route: ActivatedRoute, private router: Router, public employeeService: EmployeeService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.employeeService.getEmployeeById(this.id).subscribe((data: any) => {
      console.log(data);
      this.employee.username = data.UserName;
      this.employee.fullName = data.FullName;
      this.employee.currentProjects = data.CurrentProjects;
      this.employee.reportingLine = data.ReportingLine;
      this.employee.businessRole = data.BusinessRole;

    });
  }

  cancel() {
    console.log('Cancel clicked!');
    this.router.navigate(['/employees']);
  }

  confirm() {
    console.log('Confirm clicked!');
    this.employeeService.deleteEmployee(this.id).subscribe((data)=>{
      console.log(data);
      if(data == 'Entry deleted')
      {
        this.router.navigate(['/employees']);
      }
    })
  }


}
