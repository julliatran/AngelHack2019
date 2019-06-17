import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: Http) {
    console.log('test service');
  }

  getListUserTier1() {
    return [this.userQuy, this.userJulia];
  }

  userQuy = {
    "id": "00001",
    "fullname": "Ha Kim Quy",
    "SSID": "214536754",
    "email": "changcodon@gmail.com",
    "phoneNumber": "0163664250",
    "workingAddress": "772 Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh",
    "workingLocation": [106.722083, 10.795058],
    "career": "IT",
    "homeAddress": "18 Cay Tram, Go Vap, Tp HCM",
    "homeLocation": [106.656181, 10.842697],
    "socialNetwork": {
      "facebook": "https://www.facebook.com/hakim.quy"
    }
  };
  userJulia = {
    "id": "00001",
    "fullname": "Jullia Tran",
    "SSID": "211028518",
    "email": "nangcodon@gmail.com",
    "phoneNumber": "0163664250",
    "workingAddress": "Landmark 81, Tp HCM",
    "workingLocation": [106.722083, 10.725058],
    "career": "IT",
    "homeAddress": "38 Le Tan Quoc, Tan Binh, Tp HCM",
    "homeLocation": [10.804528, 106.638627],
    "socialNetwork": {
        "facebook": "https://www.facebook.com/jullia.tran"
    }
};


}
