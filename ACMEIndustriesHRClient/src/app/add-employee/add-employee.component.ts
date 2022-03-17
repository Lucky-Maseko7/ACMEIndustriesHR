import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Interfaces
import { Type } from '../Interfaces/Type';
import { EmployeeService } from '../Services/Employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  typeGender: Type[] = [
    {value: 'Male'},
    {value: 'Female'},
  ];

  typeBusinessRole: Type[] = [
    {value: 'User'},
    {value: 'Manager'},
  ];
  
  imageSrc: string = '';

  constructor(private router:Router, private employeeService:EmployeeService) {
    
  }

  employeeForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    FullName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    currentProjects: new FormControl('', [Validators.required]),
    reportingLine: new FormControl('', [Validators.required]),
    businessRole: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    photoUrl: new FormControl(''),
    file: new FormControl('',),
    fileSource: new FormControl('', )
  });

  ngOnInit() {
    
  }

  onFileChange(event:any){
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.imageSrc = reader.result as string;
      
        this.employeeForm.patchValue({
          fileSource: reader.result
        });
    
      };
    
    }
  }


  onSubmit(event:any) {

    this.employeeService.createEmployee(this.employeeForm.value).subscribe((data) => {
      if(data == 'Entry was created') {
        this.router.navigate(['/employees']);
      }
    })
  }
}
