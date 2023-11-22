import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from 'src/app/Models/District';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  private REST_API_SERVER = 'https://localhost:7204/api/District';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    }),
  }
constructor(private httpclient : HttpClient) { }

public GetDistricts():Observable<District[]>{
  const url = `${this.REST_API_SERVER}/GetDistricts`;
  return this.httpclient.get<District[]>(url,this.httpOptions);
}
public GetDistrict_ByCityId(cityId: number):Observable<District[]>{
  const url = `${this.REST_API_SERVER}/GetDistricts/${cityId}`;
  return this.httpclient.get<District[]>(url,this.httpOptions);
}
}
