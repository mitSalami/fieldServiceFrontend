import { Component, OnInit } from '@angular/core';
import {Client} from "../clients/clients.component";
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute, Router} from "@angular/router";

export class Employee{
  constructor(
    public id: number,
    public name: string,
    public phoneNumber: string,
    public adresse: string,
    public color: string,
    public clientList: Client[]
  ) {
  }

}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

   employees:any;
   id: any;
   employee: any;

  constructor(
    private employeeService:EmployeeService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']

    this.employee = new Employee(this.id, '', '','','', [])

    if(this.id!=-1){
      this.employeeService.retrieveEmployee(this.id)
        .subscribe(
          data => this.employee = data
        )
    }
  }

  saveEmployee() {
    if(this.id == -1) { //=== ==
      console.log(this.employee)
      this.employeeService.createEmployee(this.employee)
        .subscribe (
          data => {
            console.log(data)
            this.router.navigate(['employeeList'])
          }
        )
    } else {
      console.log(this.employee)
      this.employeeService.updateEmployee(this.id, this.employee)
        .subscribe (
          data => {
            console.log(data)
            this.router.navigate(['employeeList'])
          }
        )
    }
  }

  deleteEmployee(){
    this.employeeService.deleteEmployee(this.id)
      .subscribe(
        data => {
          this.router.navigate(['employeeList'])
        }
      )
  }
}
