import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees:any;

  constructor(
    private employeeService:EmployeeService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.refreshEmployees()
  }

  private refreshEmployees() {
    this.employeeService.retrieveAllEmployees().subscribe(
      response => {
        this.employees = response
      }
    )
  }

  updateEmployee(id: number) {
    this.router.navigate(['employee', id])
  }

  addEmployee() {
    this.router.navigate(['employee',-1])
  }

}
