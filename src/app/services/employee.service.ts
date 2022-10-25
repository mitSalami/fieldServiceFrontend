import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../components/employee/employee.component";
import {API_URL} from "../app.constants";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllEmployees(){
    return this. http.get<Employee[]>(`${API_URL}/employee`)
  }

  retrieveEmployee(id: number){
    return this.http.get<Employee>(`${API_URL}/employee/${id}`)
  }

  createEmployee(employee: any) {
    return this.http.post(
      `${API_URL}/employee/`
      , employee);
  }

  updateEmployee(id: any, employee: any) {
    return this.http.put(
      `${API_URL}/employee/${id}`
      , employee);
  }

  deleteEmployee(id: any){
    return this.http.delete(
      `${API_URL}/employee/${id}`
    )
  }
}
