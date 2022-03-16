import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Serveces
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Material Design 
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRouterModule} from './route.routing';
import { JwtModule } from '@auth0/angular-jwt';
import { EmployeeService } from './Services/Employee.service';
import { AlertifyService } from './Services/Alertify.service';

// Components

import { AuthService } from './Services/Auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { RegisterComponent } from './register/register.component';

//MatNativeDateModule, MatMomentDateModul

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [												
    AppComponent,
      HomeComponent,
      HeaderComponent,
      FooterComponent,
      LoginComponent,
      EmployeesComponent,
      AddEmployeeComponent,
      UpdateEmployeeComponent,
      DeleteEmployeeComponent,
      RegisterComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouterModule,
    JwtModule.forRoot({
       config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:44398']
       }
    }),
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule, 
    FormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    BsDropdownModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [UpdateEmployeeComponent],
  providers: [EmployeeService, AlertifyService, 
                AuthService,MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
