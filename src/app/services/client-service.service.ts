import { API_URL } from './../app.constants';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../components/clients/clients.component";


@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllClients(){
    return this.http.get<Client[]>(`${API_URL}/clients`);
  }
  retrieveClient(id: number){
    return this.http.get<Client>(`${API_URL}/clients/${id}`);
  }

  createClient(client: any) {
    return this.http.post(
      `${API_URL}/clients/`
      , client);
  }

  updateClient(id: any, client: any) {
    console.log(client)
    return this.http.put(
      `${API_URL}/clients/${id}`
      , client);
  }

  retrieveGeoJson(){
    return this.http.get<Object>(`${API_URL}/geojson`);
  }
}
