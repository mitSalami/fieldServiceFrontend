import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapComponent} from "./components/map/map.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {ClientsComponent} from "./components/clients/clients.component";
import {ClientComponent} from "./components/client/client.component";
import {EmployeeComponent} from "./components/employee/employee.component";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";

const routes: Routes = [
  {path:'login', component: LoginComponent },
  {path:'', component: LoginComponent },
  {path:'home', component: HomeComponent },
  {path:'clients', component: ClientsComponent },
  {path:'map', component: MapComponent },
  {path:'client/:id', component: ClientComponent },
  {path:'employee-list', component: EmployeeListComponent },
  {path:'employee/:id', component: EmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
