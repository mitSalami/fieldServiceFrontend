import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from "../../services/client-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Client } from '../clients/clients.component';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {FormControl} from "@angular/forms";
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  id: any
  client: any
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  constructor(
    private clientsService: ClientServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']

    this.client = new Client(this.id, '','','','',new Date(), "9.331610", "48.049796")

    if(this.id!=-1){
      this.clientsService.retrieveClient(this.id)
        .subscribe(
          data => this.client = data
        )

    }
  }

  saveTodo() {
    if(this.id == -1) { //=== ==
      this.clientsService.createClient(this.client)
        .subscribe (
          data => {
            console.log(data)
            this.router.navigate(['clients'])
          }
        )
    } else {
      this.clientsService.updateClient(this.id, this.client)
        .subscribe (
          data => {
            console.log(data)
            this.router.navigate(['clients'])
          }
        )
    }
  }
  getFloatLabelValue(): FloatLabelType {
    return 'always';
  }

}
