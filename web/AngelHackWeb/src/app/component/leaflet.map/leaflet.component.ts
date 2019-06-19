import { Component, ChangeDetectorRef } from '@angular/core';
import { latLng, tileLayer, Layer, marker, icon, LayerGroup, Marker } from 'leaflet';
import { CustomerService } from '../../service/customer/customer.service';
import { SalerSuggestionService } from '../../service/salerSuggestion/saler.suggestion.service';
import { PotentialCustomerModel } from './potential.customer.model';

@Component({
  selector: 'leaflet-root',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css']
})
export class LeafletComponent {
  show: boolean = true

  customerObjs = [];
  selectedCustomerObj: PotentialCustomerModel;
  userTiers = this.customerService.getListUserTier1();
  customerMarkers = [];
  customerLayerGroup = new LayerGroup();

  salerSuggestionObjs = [];
  selectedSalerSuggestionObj;
  listSalerFromService = this.salerSuggestionService.getListSalerTier1();
  salerMarksers = [];
  salerLayerGroup = new LayerGroup();


  constructor(private salerSuggestionService: SalerSuggestionService, private customerService: CustomerService, private changeDetector: ChangeDetectorRef) {
    this.initCustomerMarkers();
  }


  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }),
      this.customerLayerGroup
    ],
    zoom: 10,
    center: latLng([10.714586690981509, 106.67381286621094])
  };
  layersControl = {
    overlays: {
      "Potential Customer": this.customerLayerGroup,
    }
  }


  initCustomerMarkers() {
    var i = 0;
    this.userTiers.forEach(userTier => {
      var customerObj = this.createCustomerMarker(userTier);
      this.customerObjs.push(customerObj);
      var customerMarker = customerObj.marker;
      customerMarker.addTo(this.customerLayerGroup);
      console.log(i);
      console.log(customerObj);
      i++;
    });
  }


  private createCustomerMarker(userTier) {
    var customerMarker = {
      customer: userTier,
      marker: marker([userTier.workingLocation.coordinates[0], userTier.workingLocation.coordinates[1]], {
        icon: icon({
          iconSize: [25, 31],
          iconAnchor: [13, 31],
          iconUrl: 'assets/marker_customer.png'
        })
      })
    };
    customerMarker.marker.on('click', this.customerMarkerClick, this)
    return customerMarker;
  }
  private customerMarkerClick(event){
    var latlngOfMarkerOnClick = event.latlng;
    this.customerObjs.forEach(customerObj => {
      var customerLatLng = customerObj.marker.getLatLng();
      if(latlngOfMarkerOnClick.lat == customerLatLng.lat && latlngOfMarkerOnClick.lng == customerLatLng.lng) {
        this.selectedCustomerObj = customerObj.customer;

        this.changeDetector.detectChanges();
        console.log(customerObj);
      }
    });
  }
}