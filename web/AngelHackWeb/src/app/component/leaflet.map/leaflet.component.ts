import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { latLng, tileLayer, Layer, marker, icon, LayerGroup, Marker, MarkerClusterGroup } from 'leaflet';
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
  selectedCustomerObj;
  userTiers;
  customerMarkers = [];
  customerLayerGroup = new LayerGroup();
  markerClusterGroup = new MarkerClusterGroup();


  salerSuggestionObjs = [];
  selectedSalerSuggestionObj;
  listSalerFromService = this.salerSuggestionService.getListSalerTier1();
  salerMarksers = [];
  salerLayerGroup = new LayerGroup();
  options;
  test = true;
  constructor(private salerSuggestionService: SalerSuggestionService, private customerService: CustomerService, private changeDetector: ChangeDetectorRef, private ngZone: NgZone) {
    // this.customerService.getListUserTier2().subscribe(res => {
    //   this.userTiers = res.json();
    //   console.log(this.userTiers);
    //   this.initCustomerMarkers();

    //   this.changeDetector.detectChanges();
    // });
    this.options = this.defaultMap;
    this.userTiers = this.customerService.getListUserTIer2Sample();
    // this.userTiers = [];
    this.initCustomerMarkers();

    // setTimeout(() => {
    //   var marker = new Marker([10.814416, 106.656928], {
    //     icon: icon({
    //       iconSize: [25, 31],
    //       iconAnchor: [13, 31],
    //       iconUrl: 'assets/marker_customer.png'
    //     })
    //   })
    //   marker.addTo(this.markerClusterGroup);
      
    //   this.markerClusterGroup.addLayer(marker);
    //   this.changeDetector.detectChanges();
    //   console.log("-----------------");
    // }, 3000);

    setTimeout(() => this.ngZone.run(() => {
      this.test = false;
      var marker = new Marker([10.814416, 106.656928], {
        icon: icon({
          iconSize: [25, 31],
          iconAnchor: [13, 31],
          iconUrl: 'assets/marker_customer.png'
        })
      })
      this.options = this.defaultMap;
      
      this.markerClusterGroup.addLayer(marker);
      this.changeDetector.detectChanges();
      this.test = true;
      console.log("-----------------");
    }), 3000);
  }


  initCustomerMarkers() {
    if(this.userTiers) {
      this.userTiers.forEach(userTier => {
        var customerObj = this.createCustomerMarker(userTier);
        this.customerObjs.push(customerObj);
        var customerMarker = customerObj.marker;
        customerMarker.addTo(this.customerLayerGroup);
      });
    }
    this.markerClusterGroup.addLayer(this.customerLayerGroup);
  }


  private createCustomerMarker(userTier) {
    console.log(userTier.workingLocation.coordinates);
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
    customerMarker.marker.on('click', this.customerMarkerClick, this);
    return customerMarker;
  }
  private customerMarkerClick(event) {
    var latlngOfMarkerOnClick = event.latlng;
    this.customerObjs.forEach(customerObj => {
      var customerLatLng = customerObj.marker.getLatLng();
      if (latlngOfMarkerOnClick.lat == customerLatLng.lat && latlngOfMarkerOnClick.lng == customerLatLng.lng) {
        this.selectedCustomerObj = customerObj.customer;

        this.changeDetector.detectChanges();
        console.log(customerObj);
      }
    });
  }


  defaultMap = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 10,
    center: latLng([10.714586690981509, 106.67381286621094])
  };
}