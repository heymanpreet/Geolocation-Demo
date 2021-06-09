import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaunchDetailsService {
  constructor(private http:HttpClient) {
   }

   getCountry(lng,lat) {
     const url = `https://nominatim.openstreetmap.org/reverse.php?lon=${lng}&lat=${lat}&format=jsonv2&zoom=3`;
     return this.http.get(url);
  }
}
