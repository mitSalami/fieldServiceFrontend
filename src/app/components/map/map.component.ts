import {environment} from '../../../environments/environment';
import {Component, OnInit} from '@angular/core';
import {Client} from '../clients/clients.component';
import * as mapboxgl from "mapbox-gl";
import {ClientServiceService} from "../../services/client-service.service";
import {API_URL} from "../../app.constants";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: any;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 48.39836480523795;
  lng = 9.9878209732334;
  // @ts-ignore
  clients: Client[];
  markers: any;
  clientsList: any;
  selectedClient: any;
  clientLayerString: any;

  constructor(
    private clientsService: ClientServiceService
  ) {
  }

  ngOnInit(): void {
    this.refreshClients()
    // @ts-ignore
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 6,
      center: [this.lng, this.lat]
    });    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', () => {
      console.log(this.clientLayerString)
      this.map.addSource('clients',{
        'type': 'geojson',
        'data': `${API_URL}/geojson`
      });
      this.map.addLayer({
        'id': 'clientLayer',
        'type': 'circle',
        'source': 'clients',
        'paint': {
          'circle-color': '#4264fb',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });
      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      this.map.on('mouseenter', 'clientLayer', (e: any) => {
// Change the cursor style as a UI indicator.
        this.map.getCanvas().style.cursor = 'pointer';

// Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

// Populate the popup and set its coordinates
// based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
      });

      this.map.on('mouseleave', 'clientLayer', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });
    });
  }

  refreshClients() {
    this.clientsService.retrieveAllClients().subscribe(
      response => {
        this.clients = response;
      }
    )
    this.clientsService.retrieveGeoJson().subscribe(
      response => {
        this.clientLayerString = response;
      },
    )
  }

  addMarker(clients: Client[]) {
    clients.forEach(coordinates => {
      new mapboxgl.Marker().setLngLat([+coordinates.longitude, +coordinates.latitude]).addTo(this.map)
    })
  }


  onNgModelChange($event: any) {
    this.map.flyTo({
      zoom: 10,
      center: [+this.selectedClient[0].longitude, +this.selectedClient[0].latitude]
    })
  }
}
