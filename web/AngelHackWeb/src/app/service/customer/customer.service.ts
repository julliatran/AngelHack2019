import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PotentialCustomerModel } from '../../component/leaflet.map/potential.customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: Http) {
    console.log('test service');
  }

  getListUserTier1(): PotentialCustomerModel[] {
    return [this.userQuy, this.userJulia];
  }

  userQuy = {
    "id": "00001",
    "fullname": "Ha Kim Quy",
    "SSID": "214536754",
    "email": "changcodon@gmail.com",
    "age": 22,
    "isMale": true,
    "phoneNumber": "0163664250",
    "workingAddress": "772 Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh",
    "workingLocation": {
      type: "Point",
      coordinates: [10.795058, 106.722083]
    },
    "suggestCustomerNeed": ["Smartphone", "Motorbyke", "Laptop"],
    "career": "IT",
    "homeAddress": "18 Cay Tram, Go Vap, Tp HCM",
    "homeLocation": {
      type: "Point",
      coordinates: [10.842697, 106.656181]
    },
    "socialNetwork": {
      "Facebook": "https://www.facebook.com/hakim.quy"
    }
  };
  userJulia = {
    "id": "00001",
    "fullname": "Jullia Tran",
    "SSID": "211028518",
    "email": "nangcodon@gmail.com",
    "age": 24,
    "isMale": false,
    "phoneNumber": "0163664250",
    "workingAddress": "Landmark 81, Tp HCM",
    "workingLocation": {
      type: "Point",
      coordinates: [10.725058, 106.722083]
    },
    "suggestCustomerNeed": ["Smartphone", "Laptop"],
    "career": "IT",
    "homeAddress": "38 Le Tan Quoc, Tan Binh, Tp HCM",
    "homeLocation": {
      type: "Point",
      coordinates: [10.804528, 106.638627]
    },
    "socialNetwork": {
      "Facebook": "https://www.facebook.com/jullia.tran"
    }
  };


}
