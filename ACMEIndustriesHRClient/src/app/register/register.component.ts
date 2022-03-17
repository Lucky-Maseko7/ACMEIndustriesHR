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

  imageSrc: string = '';

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

  onFileChange(event:any){
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.imageSrc = reader.result as string;
      
        this.registerForm.patchValue({
          fileSource: reader.result
        });
    
      };
    
    }
  }


  onSubmit() {
    

    delete this.registerForm.value.confirmPassword;

    this.registerForm.value.businessRole = 'User';

    this.authService.register(this.registerForm.value).subscribe((data : any) => {

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