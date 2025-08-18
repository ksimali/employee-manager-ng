import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from './services/employee.service';
import { Employee } from './models/employee.model';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  
  // property
  public employees: Employee[] = [];
  public editEmployee: Employee | null=null;

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
      this.editEmployee = employee;
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    //create the button in the main-container
    container?.appendChild(button);
    button.click();
  }

  // Method to add an employee
  public onAddEmployee(addForm: NgForm) : void {
    // close the addForm when submit with success
    document.getElementById("add-employee-form")?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  // Method to update an employee
  public onUpdateEmployee(employee: Employee) : void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response : Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
