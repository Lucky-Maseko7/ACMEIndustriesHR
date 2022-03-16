import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Type } from '../Interfaces/Type';
import { AuthService } from '../Services/Auth.service';
import { EmployeeService } from '../Services/Employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  typeGender: Type[] = [
    {value: 'Male'},
    {value: 'Female'},
  ];

  typeBusinessRole: Type[] = [
    {value: 'User'},
    {value: 'Manager'},
  ];

  registerForm: FormGroup;

  constructor(private router:Router, private authService:AuthService, private fb: FormBuilder) { 

    this.registerForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],   
      FullName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      currentProjects: ['', Validators.required],
      reportingLine: ['', Validators.required],
      address: ['', Validators.required],
      photoUrl:'',}, {validator: matchingFields('password', 'confirmPassword')}
      );

  }



  ngOnInit() {

  }


  onSubmit() {
    console.log('Form data' + JSON.stringify(this.registerForm.value));

    delete this.registerForm.value.confirmPassword;

    this.registerForm.value.businessRole = 'User';

    this.authService.register(this.registerForm.value).subscribe((data : any) => {
      console.log('Responce ' + JSON.stringify(data));

      localStorage.setItem('userName', data.UserName);
      localStorage.setItem('token_value', data.Token);
    });
  }

}


function matchingFields(field1: string, field2: string) {
  return (form: { 
    controls: { 
      [x: string]: { 
        value: any; 
      }; 
    }; 
  }) => {
    if(form.controls[field1].value !== form.controls[field2].value)
     return {matchingFields: true}
  }
}