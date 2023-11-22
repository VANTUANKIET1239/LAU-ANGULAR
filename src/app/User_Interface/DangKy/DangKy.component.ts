import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/Models/SignUp';
import { UserAuthService } from 'src/app/Services/UserAuth/UserAuth.service';

@Component({
  selector: 'app-DangKy',
  templateUrl: './DangKy.component.html',
  styleUrls: ['./DangKy.component.css']
})
export class DangKyComponent implements OnInit {
  public dataform!: FormGroup;
  UserLogin: SignUp = new SignUp();
  invalidSignUp:boolean = false;
  ErrorMessage!:string;
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
      name: [''],
      phone: ['', Validators.required],
      password: ['',[Validators.minLength(6),Validators.required]],
      confirmPassword: ['',Validators.required]
    });
  }
  ShowErrorMessage(message: string){
    this.invalidSignUp = true;
    this.ErrorMessage = message;
}
  public CheckSignUp():boolean{
    return false;
  }
  public SignUp(){
        if(this.CheckSignUp()){
          return;
      }
      let UserForm = this.dataform.value;
      this.UserLogin.Email = UserForm.email;
      this.UserLogin.Password = UserForm.password;
      this.UserLogin.ConfirmPassword = UserForm.confirmPassword;
      this.UserLogin.Phone = UserForm.phone;
      this.UserLogin.Name = UserForm.name;
      this.UserService.SignUp(this.UserLogin).subscribe({
        next: (response: any) => {
          if(response.success){
            alert("Đăng ký thành công");
            this.invalidSignUp = false;
            this.route.navigate(["/DangNhap"]).then(x => {
              window.location.reload();
            });
          }
          else{
            this.invalidSignUp = true;
              this.ShowErrorMessage(response.message);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
  }

}
