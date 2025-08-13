import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from './services/employee.service';
import { Employee } from './models/employee.model';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  
  // property
  public employees: Employee[] = [];

  // constructor with the employee.service injection
  constructor(private employeeService: EmployeeService) {}
  
  // to call getEmployees whenever this component is loaded
  ngOnInit(): void {
    this.getEmployees();
  }
 
  // Method to get all employees
  public getEmployees(){
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
