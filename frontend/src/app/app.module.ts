import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';

import { EmployeeAPIService } from './employees/employee-api.service';
import { HighestSalariesAPIService } from './highest-salaries/highest-salaries-api.service'
import { EmployeesComponent } from './employees/employees.component';
import { HighestSalariesComponent } from './highest-salaries/highest-salaries.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    HighestSalariesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule,
    DialogModule,
    ReactiveFormsModule,
    TabMenuModule
  ],
  providers: [EmployeeAPIService, HighestSalariesAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
