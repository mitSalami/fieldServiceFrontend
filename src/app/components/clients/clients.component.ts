import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from "../../services/client-service.service";
import {Router} from "@angular/router";

export class Client {
  constructor(
    public id: number,
    public name: string,
    public adress: string,
    public employee: string,
    public phone: string,
    public lastVisited: Date,
    public longitude: string,
    public latitude: string
  ) {

  }
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: any;

  constructor(
    private clientService:ClientServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshClients()
  }

  refreshClients(){
    this.clientService.retrieveAllClients().subscribe(
      response => {
        this.clients = response
      }
    )
  }

  updateClient(id: number) {
    this.router.navigate(['client', id])
  }

  addClient() {
    this.router.navigate(['client',-1])
  }
}
