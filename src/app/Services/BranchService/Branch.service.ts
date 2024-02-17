import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from 'src/app/Models/Branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private REST_API_SERVER = 'https://localhost:7204/api/Branch';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    }),
  }
  constructor(private httpclient : HttpClient) { }

  public Branch_Del(branchId:string):Observable<any>{
     const url = `${this.REST_API_SERVER}/Branch_Del`;
     let formdata = new FormData();
     formdata.append("branchId", branchId)
     return this.httpclient.post<any>(url,formdata);
  }
  public Branch_Ins(branch:Branch): Observable<any>{
    const url = `${this.REST_API_SERVER}/Branch_Ins`;
    return this.httpclient.post<Branch>(url,branch,this.httpOptions);
  };
  public Branch_Upd(branch:Branch): Observable<any>{
    const url = `${this.REST_API_SERVER}/Branch_Upd`;
    return this.httpclient.post<Branch>(url,branch,this.httpOptions);
  }
  public Branch_ById(branchId:string): Observable<Branch>{
    const url = `${this.REST_API_SERVER}/Branch_ById/${branchId}`;
    return this.httpclient.get<Branch>(url,this.httpOptions);
  };
  public Branch_List(): Observable<Branch[]>{
    const url = `${this.REST_API_SERVER}/Branch_List`;
    return this.httpclient.get<Branch[]>(url,this.httpOptions);
  };

  public Branch_ListExcept(promotionId:string): Observable<Branch[]>{
    const url = `${this.REST_API_SERVER}/Branch_ListExcept/${promotionId}`;
    return this.httpclient.get<Branch[]>(url,this.httpOptions);
  };

  public Branch_ByPromotionId(promotionId:string): Observable<Branch[]>{
    const url = `${this.REST_API_SERVER}/Branch_ByPromotionId/${promotionId}`;
    return this.httpclient.get<Branch[]>(url,this.httpOptions);
  };


}
