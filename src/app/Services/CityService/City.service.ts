import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/Models/Ctity';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private REST_API_SERVER = 'https://localhost:7204/api/City';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    }),
  }
constructor(private httpclient : HttpClient) { }

public GetCities():Observable<City[]>{
  const url = `${this.REST_API_SERVER}/GetCities`;
  return this.httpclient.get<City[]>(url,this.httpOptions);
}

}
