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

  // Method to open the right modal when the button is clicked
  public onOpenModal(employee: Employee | null, mode: string ) : void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    // set data-target value depending on mode value
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    //create the button in the main-container
    container?.appendChild(button);
    button.click();
  }
}
