import { Component,OnInit,TemplateRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/Models/User';
import { UserAuthService } from 'src/app/Services/UserAuth/UserAuth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserAuthenticate:boolean = false;
  UserInfo: User = new User();
  constructor(private jwtHelper: JwtHelperService,
              private userService: UserAuthService
      ){

  }
  ngOnInit(): void {
      this.isUserAuthenticated();
  }

  public isUserAuthenticated(): void {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      this.isUserAuthenticate = true;

      return;
    }
    this.isUserAuthenticate = false;
  }
}
