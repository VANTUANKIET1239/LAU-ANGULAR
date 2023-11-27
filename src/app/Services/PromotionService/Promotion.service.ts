import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promotion } from 'src/app/Models/Promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private REST_API_SERVER = 'https://localhost:7204/api/Promotion';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    }),
  }

constructor(private httpclient: HttpClient) { }

  public CreatePromotion(promotion:Promotion,imageFile:File): Observable<any>{
    const url = `${this.REST_API_SERVER}/CreatePromotionCategory`;
    const formData = new FormData();
    formData.append('promotion', JSON.stringify(promotion));
    if(imageFile){
      formData.append('fromFile', imageFile, imageFile.name);
    }
    return  this.httpclient.post<any>(url,formData);
  };
  public GetPromotion(promotionid:string): Observable<Promotion>{
    const url = `${this.REST_API_SERVER}/GetPromotion/${promotionid}`;
    return this.httpclient.get<Promotion>(url,this.httpOptions);
  };
  public GetPromotions(): Observable<Promotion[]>{
    const url = `${this.REST_API_SERVER}/GetPromotions`;
    return this.httpclient.get<Promotion[]>(url,this.httpOptions);
  };
  public RemovePromotion(promotionId: string): Observable<any>{
    const url = `${this.REST_API_SERVER}/RemovePromotionCategory`;
    let removeItem = new FormData();
    removeItem.append('promotionId',promotionId);
    return this.httpclient.post<any>(url,removeItem);
  }
  public UpdatePromotion(promotion:Promotion,imageFile:File): Observable<any>{
    const url = `${this.REST_API_SERVER}/UpdatePromotionCategory`;
    const formData = new FormData();
    formData.append('promotion', JSON.stringify(promotion));
    if(imageFile){
      formData.append('fromFile', imageFile, imageFile.name);
    }
    return  this.httpclient.post<any>(url,formData);
  };

  // public RemoveMenu(menu:Menu): Observable<any>{
  //   const url = `${this.REST_API_SERVER}/RemoveMenu`;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'text/json',
  //   });
  //   return this.httpclient.post<Menu>(url,menu,this.httpOptions);
  // };

}
