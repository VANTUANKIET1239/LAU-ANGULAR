import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ward } from 'src/app/Models/Ward';

@Injectable({
  providedIn: 'root'
})
export class WardService {

  private REST_API_SERVER = 'https://localhost:7204/api/Ward';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    }),
  }
constructor(private httpclient : HttpClient) { }

public GetWards():Observable<Ward[]>{
  const url = `${this.REST_API_SERVER}/GetWards`;
  return this.httpclient.get<Ward[]>(url,this.httpOptions);
}
public GetWards_ByDistrictId(districtId: number):Observable<Ward[]>{
  const url = `${this.REST_API_SERVER}/GetWards/${districtId}`;
  return this.httpclient.get<Ward[]>(url,this.httpOptions);
}

}
