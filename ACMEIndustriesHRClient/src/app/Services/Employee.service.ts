import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../Interfaces/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  baseUrl = environment.apiUrl + 'employee'

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.baseUrl);
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.baseUrl, employee);
  }

  updateEmployee(id:number, employee: Employee) {
    return this.http.put(this.baseUrl+'/'+id, employee);
  }

  deleteEmployee(id: any){
    return this.http.delete(this.baseUrl+'/'+id);
  }

  getEmployeeById(id: any){
    return this.http.get(this.baseUrl+'/'+id);
  }

  isManager(businessRole: any) {
    if(businessRole === 'Manager') return true;
  }

}
