import { Component } from '@angular/core';
import { latLng, tileLayer, Layer, marker, geoJSON } from 'leaflet';
import { CustomerService } from '../../service/customer.service';
import { LeafletLayersFECreditModel } from './layer.model';

@Component({
  selector: 'leaflet-root',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css']
})
export class LeafletComponent {

  FELocation = {
		id: 'geoJSON',
		name: 'Geo JSON Polygon',
		enabled: true,
		layer: geoJSON(
			({
				type: 'Polygon',
				coordinates: [[
          [
            106.6775894165039,
            10.796379859206972
          ],
          [
            106.67226791381836,
            10.7962112363456
          ],
          [
            106.6717529296875,
            10.784070141719273
          ],
          [
            106.6775894165039,
            10.796379859206972
          ]
				]]
			}) as any,
			{ style: () => ({ color: '#ff7800' })})
  }
  userTier1 = this.customerService.getListUserTier1();
  CustomerLocation = this.extractCustomerLocation('Customer Location', 'Customer Location', this.userTier1);

  constructor(private customerService: CustomerService) {
    console.log(this.FELocation);
    console.log(this.CustomerLocation);
  }

	// Form model object
	model = new LeafletLayersFECreditModel(
		[ this.FELocation, this.CustomerLocation ]
	);


	layers: Layer[];

	layersControl = {
		overlays: {
			FELocation: this.FELocation.layer,
			CustomerLocation: this.CustomerLocation.layer
		}
  };
  


  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 10,
    center: latLng([10.714586690981509, 106.67381286621094])
  };

  GEOJSON_FORMAT = {
    "type": "FeatureCollection",
    "features": []
  };
  FEATURE_FORMAT = {
    "type": "Feature",
    "properties": {},
    "geometry": {}
  };
  POINT_FORMAT = {
    "type": "Point",
    "coordinates": []
  };

  extractCustomerLocation(id, name, userTiers){
    var layer = {
      id: id,
      name: name,
      enabled: true,
      layer: geoJSON()
    };

    return layer;
  }

	apply() {
		// Get all the active overlay layers
		const newLayers = this.model.overlayLayers
			.filter((l: any) => l.enabled)
			.map((l: any) => l.layer);

		this.layers = newLayers;

		return false;
	}
}