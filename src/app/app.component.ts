import { Component, OnInit } from '@angular/core';
import { LaunchDetailsService } from './services/launch-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  name = 'Demo App for location using open API';
  public lat;
  public lng;
  userLocation;

  public ngOnInit(): void {
    this.getLocation();
  }
  constructor(private locationService: LaunchDetailsService) {}

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            console.log(
              'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
            );
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat);
            console.log(this.lng);
          }
          // this.getAllData();
          this.userLocation = this.getCountryDetail();
        },
        (error) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  // getCountry() {
  //   const url = `https://nominatim.openstreetmap.org/reverse.php?lon=${
  //     this.lng
  //   }&lat=${this.lat}&format=jsonv2&zoom=3`;
  //   return this.http.get(url);
  // }

  getCountryDetail() {
    return this.locationService.getCountry(this.lng,this.lat)
      .toPromise()
      .then(function(data) {
        const locationDetails = data;
        if (locationDetails) {
          console.log(locationDetails['address'].country);
          // this.userLocation = locationDetails['address'].country;
          return locationDetails['address'].country;
        }
      });
  }

  // async getAllData() {
  //   const locationDetails = await this.getCountryDetail();
  //   if (locationDetails['address'].country) {
  //     console.log(locationDetails['address'].country);
  //     this.userLocation = locationDetails['address'].country;
  //     return this.userLocation;
  //   }
  // console.log(locationDetails['address'].country);
  // this.userLocation = locationDetails['address'].country;
  // }

 }
