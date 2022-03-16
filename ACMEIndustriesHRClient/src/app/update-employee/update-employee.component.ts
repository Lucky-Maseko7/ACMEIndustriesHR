import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Type } from '../Interfaces/Type';
import { AuthService } from '../Services/Auth.service';
import { EmployeeService } from '../Services/Employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  typeGender: Type[] = [
    {value: 'Male'},
    {value: 'Female'},
  ];

  typeBusinessRole: Type[] = [
    {value: 'User'},
    {value: 'Manager'},
  ];

  form:FormGroup;
  id: number = 0;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<UpdateEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {employee: any},
              private service: EmployeeService, private authService: AuthService, private router: Router) 
  { 
    console.log('DATA: ' + JSON.stringify(data));
    let employeeToUpdate = data.employee;
    this.id = employeeToUpdate.Id;

    this.form = fb.group({
      username: new FormControl(employeeToUpdate.UserName, Validators.required),
      password: new FormControl(employeeToUpdate.Password, Validators.required),
      FullName: new FormControl(employeeToUpdate.FullName, [Validators.required]),
      gender: new FormControl(employeeToUpdate.Gender, [Validators.required]),
      dateOfBirth: new FormControl(employeeToUpdate.DateOfBirth, [Validators.required]),
      currentProjects: new FormControl(employeeToUpdate.CurrentProjects, [Validators.required]),
      reportingLine: new FormControl(employeeToUpdate.ReportingLine, [Validators.required]),
      businessRole: new FormControl(employeeToUpdate.BusinessRole, [Validators.required]),
      address: new FormControl(employeeToUpdate.Address, [Validators.required]),
      photoUrl: new FormControl(employeeToUpdate.PhotoUrl),
    })
  }

  save() {
    
    this.form.value.id = this.id;
    let currentUser = this.authService.getEmployee();


    console.log('Data: ' + JSON.stringify(this.form.value))

    this.service.updateEmployee(this.id, this.form.value).subscribe((response) => {
      console.log('Response: ' + response)
      if( this.id === currentUser.Id && response === 'Employee updated!'){
        
        localStorage.removeItem('Employee');
        localStorage.setItem('Employee', JSON.stringify(this.form.value));
      }
      window.location.reload();
    })

  }

  close() {
    console.log('Close Clicked')
    this.dialogRef.close();
  }

}
