import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../Interfaces/Employee';
import { AuthService } from '../Services/Auth.service';
import { EmployeeService } from '../Services/Employee.service';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Age', 'Gender', 'Address', 'Current Projects', 
                                'Reporting Line', 'Business Role', 'Actions'];
  dataSource: any;

  currentEmployee: any;

  isManager: any;

  values: any[] = [];

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  
  constructor(private service:EmployeeService, private auth:AuthService, private dialog: MatDialog) {
    
  }

  ngOnInit() {
    this.isManager = this.auth.isManagerFunction();
    this.currentEmployee = this.auth.currentEmployee;
    this.getValues(); 
  }

  getValues(){

    this.service.getAll().subscribe((data) => {
      
       this.values = data as Employee[];

      this.values.filter(item => item !== this.currentEmployee);

      this.dataSource = new MatTableDataSource<Employee>(this.values);
      
      this.dataSource.paginator = this.paginator;
    });

  }

  GetAge(birthdate: any){
    if(birthdate)
    {
        var timeDiff = Math.abs(Date.now() - birthdate);
        //Used Math.floor instead of Math.ceil
        //so 26 years and 140 days would be considered as 26, not 27.
         return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
  }

  

  isManagerFunction(employee: any) {
    if(employee.BusinessRole === 'Manager') return true;
  }

  updateEntry(employee: any) {

    this.dialog.open(UpdateEmployeeComponent, {
      data: { employee }
    });
    
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
