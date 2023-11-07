import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SignIn } from 'src/app/Models/SignIn';
import { UserAuthService } from 'src/app/Services/UserAuth/UserAuth.service';

@Component({
  selector: 'app-TrangDangNhap',
  templateUrl: './TrangDangNhap.component.html',
  styleUrls: ['./TrangDangNhap.component.css']
})
export class TrangDangNhapComponent implements OnInit {

  public dataform!: FormGroup;
  UserLogin: SignIn = new SignIn();
  invalidLogin!:boolean;
  ErrorMessage!: string;
  isInvalid:boolean = false;
  constructor(
    private formbuilder:FormBuilder,
    private UserService:UserAuthService,
    private route:Router
  ) { }

  ngOnInit() {
    this.CreateNewForm();
  }
  public CreateNewForm(){
    this.dataform = this.formbuilder.group({
      email: ['',[Validators.email, Validators.required]],
      password: ['',[Validators.minLength(6), Validators.required]],
    });
  }
  ShowErrorMessage(message: string){
        this.isInvalid = true;
        this.ErrorMessage = message;
  }
  public CheckLogin():boolean{
    if (this.dataform.invalid) {
      if (this.dataform.controls['email'].hasError('required')) {
        this.ShowErrorMessage('Tài khoản đang để trống');
      }
      else if (this.dataform.controls['email'].hasError('email')) {
        this.ShowErrorMessage('Tài khoản email định dạng sai');
      }
      else if (this.dataform.controls['password'].hasError('required')) {
        this.ShowErrorMessage('Mật khẩu đang để trống');
      }
      else if (this.dataform.controls['password'].hasError('minlength')) {
        this.ShowErrorMessage('Mật khẩu cần phải dài hơn 6 kí tự');
      }
      return true;
    }
    return false;
  }
  public Login(){
      if(this.CheckLogin()){
          return;
      }
      let UserForm = this.dataform.value;
      this.UserLogin.Email = UserForm.email;
      this.UserLogin.Password = UserForm.password;
      this.UserService.Login(this.UserLogin).subscribe({
        next: (response: any) => {
            if(response.success){
              const token = response.token;
              console.log(token);
              localStorage.setItem("jwt", token);
              this.invalidLogin = false;
              this.route.navigate(["/TrangChu"]).then(x => {
                window.location.reload();
              });
            }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.invalidLogin = true;
          window.location.reload();
        }
      });
  }
  // public Logout(){
  //     localStorage.removeItem('jwt');
  //     this.route.navigate(["/DangNhap"]);
  // }

}
