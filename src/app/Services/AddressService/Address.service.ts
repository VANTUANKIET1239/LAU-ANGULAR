import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/Models/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private REST_API_SERVER = 'https://localhost:7204/api/Address';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    }),
  }
  constructor(private httpclient : HttpClient) { }

  public Address_Del(addressId:string):Observable<any>{
     const url = `${this.REST_API_SERVER}/Address_Del`;
     let formdata = new FormData();
     formdata.append("addressId", addressId)
     return this.httpclient.post<any>(url,formdata);
  }
  public Address_Ins(address:Address): Observable<any>{
    const url = `${this.REST_API_SERVER}/Address_Ins`;
    return this.httpclient.post<Address>(url,address,this.httpOptions);
  };
  public Address_Upd(address:Address): Observable<any>{
    const url = `${this.REST_API_SERVER}/Address_Upd`;
    return this.httpclient.post<Address>(url,address,this.httpOptions);
  }
  public GetAddress_ById(addressId:string): Observable<Address>{
    const url = `${this.REST_API_SERVER}/GetAddressById/${addressId}`;
    return this.httpclient.get<Address>(url,this.httpOptions);
  };
  public GetAddress_ByUserId(userId:string): Observable<Address[]>{
    const url = `${this.REST_API_SERVER}/GetAddressByUserId/${userId}`;
    return this.httpclient.get<Address[]>(url,this.httpOptions);
  };
  public GetAddress_Default(userId:string): Observable<Address>{
    const url = `${this.REST_API_SERVER}/GetAddressDefault/${userId}`;
    return this.httpclient.get<Address>(url,this.httpOptions);
  };
}
