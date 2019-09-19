import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EmployeeAPIService } from './employee-api.service';
import { Employee } from './employee.model'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employeesListSubs: Subscription;
  employeesList: Employee[];
  displayCreateEmployee: boolean = false;
  displayEditEmployee: boolean = false;
  employeeOptions: any = ["employee", "management"];
  newEmployeeForm = this.fb.group({
    name: ['', Validators.required],
    company: ['', Validators.required],
    salary: ['', Validators.required],
    type: ['employee', Validators.required],
    lunchtime: [''],
    years_of_experience: [''],
    reception_hours: ['']
  });
  editEmployeeForm = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    company: ['', Validators.required],
    salary: ['', Validators.required],
    type: ['employee', Validators.required],
    lunchtime: [''],
    years_of_experience: [''],
    reception_hours: ['']
  });
  selectedEmployee: Employee;
  cols: any[];

  constructor(private fb: FormBuilder, private employeesAPI: EmployeeAPIService) { }

  ngOnInit() {
    this.employeesListSubs = this.employeesAPI
      .getAllEmployees()
      .subscribe(res => {
        this.employeesList = res;
      },
      console.error
    );

    this.cols = [
           { field: 'name', header: 'Name' },
           { field: 'company', header: 'Company' },
           { field: 'salary', header: 'Salary' },
           { field: 'type', header: 'Type' },
           { field: 'lunchtime', header: 'Lunch Time' },
           { field: 'years_of_experience', header: 'Year(s) of Experience' },
           { field: 'reception_hours', header: 'Reception Hours' }
    ];

    this.newEmployeeForm.controls['reception_hours'].disable();
    this.newEmployeeForm.controls['lunchtime'].enable();
    this.newEmployeeForm.controls['years_of_experience'].enable();
  }

  ngOnDestroy() {
      this.employeesListSubs.unsubscribe();
  }

  changeEmployee(value: String) {
    if(this.newEmployeeForm.controls['type'].value == "employee") {
      this.newEmployeeForm.controls['reception_hours'].disable();
      this.newEmployeeForm.controls['lunchtime'].enable();
      this.newEmployeeForm.controls['years_of_experience'].enable();
    } else {
      this.newEmployeeForm.controls['reception_hours'].enable();
      this.newEmployeeForm.controls['lunchtime'].disable();
      this.newEmployeeForm.controls['years_of_experience'].disable();
    }
  }

  editChangeEmployee(value: String) {
    if(this.editEmployeeForm.controls['type'].value == "employee") {
      this.editEmployeeForm.controls['reception_hours'].disable();
      this.editEmployeeForm.controls['lunchtime'].enable();
      this.editEmployeeForm.controls['years_of_experience'].enable();
    } else {
      this.editEmployeeForm.controls['reception_hours'].enable();
      this.editEmployeeForm.controls['lunchtime'].disable();
      this.editEmployeeForm.controls['years_of_experience'].disable();
    }
  }

  onRowSelect(event: any) {
    let employee = event.data;
    this.displayEditEmployee = true;

    if(employee.type == "employee") {
      this.editEmployeeForm.controls['reception_hours'].disable();
      this.editEmployeeForm.controls['lunchtime'].enable();
      this.editEmployeeForm.controls['years_of_experience'].enable();
    } else {
      this.editEmployeeForm.controls['reception_hours'].enable();
      this.editEmployeeForm.controls['lunchtime'].disable();
      this.editEmployeeForm.controls['years_of_experience'].disable();
    }

    this.editEmployeeForm.patchValue({
      id: employee.id,
      name: employee.name,
      company: employee.company,
      salary: employee.salary,
      type: employee.type,
      lunchtime: employee.lunchtime,
      years_of_experience: employee.years_of_experience,
      reception_hours: employee.reception_hours
    });

    this.newEmployeeForm.markAsPristine();
    this.newEmployeeForm.markAsUntouched();
  }

  onEdit() {
    this.employeesAPI
      .editEmployee(this.editEmployeeForm.value)
      .subscribe(employee => {
        this.employeesList = this.employeesList.filter(employeeObj => employeeObj.id !== employee.id);
        this.employeesList = [...this.employeesList, employee];
        this.displayEditEmployee = false;
        this.editEmployeeForm.reset();
        this.editEmployeeForm.markAsPristine();
        this.editEmployeeForm.markAsUntouched();
      });
  }

  onSave() {
    this.employeesAPI
      .addEmployee(this.newEmployeeForm.value)
      .subscribe(employee => {
        this.employeesList = [...this.employeesList, employee];
        this.displayCreateEmployee = false;
        this.newEmployeeForm.reset();
        this.newEmployeeForm.markAsPristine();
        this.newEmployeeForm.markAsUntouched();
      });
  }

  showCreateEmployeDialog() {
        this.displayCreateEmployee = true;
  }
}
