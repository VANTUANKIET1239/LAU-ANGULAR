import { publishFacade } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/Services/UserAuth/UserAuth.service';

@Component({
  selector: 'app-Carousel-Slider',
  templateUrl: './Carousel-Slider.component.html',
  styleUrls: ['./Carousel-Slider.component.css']
})
export class CarouselSliderComponent implements OnInit {
  public dataform!: FormGroup;
  constructor(
    private formbuilder:FormBuilder,
    private UserService:UserAuthService
  ) {


  }

  ngOnInit() {
    this.CreateNewForm();

  }
  public CreateNewForm(){
    this.dataform = this.formbuilder.group({
      email: ['',Validators.email],
      password: ['',Validators.minLength(6)],
    });
  }
  public CheckLogin():boolean{
    return false;
  }
  public Login(){
      if(this.CheckLogin()){
          return;
      }
  }
  GetUS(){
        this.UserService.GetUser().subscribe(x => {
          console.log(x);
      });
  }
}
