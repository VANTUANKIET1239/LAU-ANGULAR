import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { SignIn } from 'src/app/Models/SignIn';
import { User } from 'src/app/Models/User';
import { UserAuthService } from 'src/app/Services/UserAuth/UserAuth.service';
import { LoadingScreenComponent } from 'src/app/UiTools/Loading/LoadingScreen/LoadingScreen.component';

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
  @ViewChild('loading') LoadingCompo!:LoadingScreenComponent
  constructor(
    private formbuilder:FormBuilder,
    private UserService:UserAuthService,
    private route:Router,
    private userService: UserAuthService
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
      this.LoadingCompo.SetLoading(true);
      this.UserService.Login(this.UserLogin)
      .pipe(finalize( () =>{this.LoadingCompo.SetLoading(false)}) )
      .subscribe({
        next: (response: any) => {
          console.log("Dang nhap");
            if(response.success){
              const token = response.token;
              console.log(token);
              localStorage.setItem("jwt", token);
              this.invalidLogin = false;

              this.userService.GetUser().subscribe(x => {
                  let currentUser : User = new User();
                  currentUser = x;
                  localStorage.setItem('user',JSON.stringify(currentUser));
                  this.route.navigate(["/TrangChu"]).then(x => {
                    window.location.reload();
                  });
              });

            }
            else{
              this.ShowErrorMessage(response.message);
              this.invalidLogin = true;
            }
        }
      });
  }
  // public Logout(){
  //     localStorage.removeItem('jwt');
  //     this.route.navigate(["/DangNhap"]);
  // }

}
