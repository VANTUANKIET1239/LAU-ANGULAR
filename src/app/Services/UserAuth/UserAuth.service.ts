
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from 'src/app/Models/SignIn';
import { SignUp } from 'src/app/Models/SignUp';
import { User } from 'src/app/Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

    private REST_API_SERVER = 'https://localhost:7204/api/Account';
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      }),
    }
  constructor(private httpclient: HttpClient,


    ) { }

  public  Login(UserSignIn: SignIn){
    const url = `${this.REST_API_SERVER}/SignIn`;
    return  this.httpclient.post<any>(url,UserSignIn,this.httpOptions);
  }
  public  SignUp(UserSignIn: SignUp){
    const url = `${this.REST_API_SERVER}/SignUp`;
    return  this.httpclient.post<any>(url,UserSignIn,this.httpOptions);
  }
  public  GetUser(){
    const url = `${this.REST_API_SERVER}/CurrentUser`;
    return  this.httpclient.get<User>(url,this.httpOptions);
  }

}
