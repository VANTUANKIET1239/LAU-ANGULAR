
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from 'src/app/Models/SignIn';
import { SignUp } from 'src/app/Models/SignUp';
import { User } from 'src/app/Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
    private currentUser :User = new User();
    private REST_API_SERVER = 'https://localhost:7204/api/Account';
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      }),
    }
  constructor(private httpclient: HttpClient,


    ) {
        this.GetUser().subscribe(x => {
            this.currentUser = x;
        });

    }
    public get CurrentUser(){
      return this.currentUser;
    }
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
  public  EditUser(UserDto:User, imageFile:File){
    const url = `${this.REST_API_SERVER}/EditUser`;
    const formData = new FormData();
    formData.append('userDto', JSON.stringify(UserDto));
    if(imageFile){
      formData.append('imageUpload', imageFile, imageFile.name);
    }
    return  this.httpclient.post<any>(url,formData);
  }
}
