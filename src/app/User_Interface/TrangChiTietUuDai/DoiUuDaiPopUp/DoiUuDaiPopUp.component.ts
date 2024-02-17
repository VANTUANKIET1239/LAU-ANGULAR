import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotificationModel } from 'src/app/Models/NotificationModel';
import { Promotion } from 'src/app/Models/Promotion';
import { User } from 'src/app/Models/User';
import { PromotionService } from 'src/app/Services/PromotionService/Promotion.service';
import { UserAuthService } from 'src/app/Services/UserAuth/UserAuth.service';

@Component({
  selector: 'app-DoiUuDaiPopUp',
  templateUrl: './DoiUuDaiPopUp.component.html',
  styleUrls: ['./DoiUuDaiPopUp.component.css']
})
export class DoiUuDaiPopUpComponent implements OnInit {
  public popupCondition:boolean = false;
  public promotionModel:Promotion = new Promotion();
  public currentUser:User = new User();
  public remainingPoint: number = 0;
  public notificationModel: NotificationModel = new NotificationModel();
  constructor(

    private promotionService: PromotionService,
    private userService:UserAuthService
  ) {
     // this.currentUser = JSON.parse(localStorage.getItem('user')?? "") ?? new User();
  }


  ngOnInit() {
  }
  public Showpopup(promotionid?:string){

    if(promotionid){
        this.promotionService.GetPromotion(promotionid).subscribe(x => {
            this.promotionModel = x;
            this.userService.GetUser().subscribe(x =>{
              this.currentUser = x;
              this.remainingPoint = this.currentUser.rewardPoints - this.promotionModel.discountValue;
            });
        });
    }
    this.popupCondition = !this.popupCondition;
    this.lockScroll(this.popupCondition);

}
public lockScroll(ispopup:boolean) {
  //this.isScrollLocked = ispopup;
  if(ispopup){
    document.body.style.overflow = 'hidden';
  }
  else{
    document.body.style.overflow = '';
  }
}
public RedeemPromotion(){
    this.promotionService.Promotion_Redeem(this.promotionModel.promotion_Id)
    .subscribe(x => {
        if(x.success){
            alert("Đổi ưu đãi thành công");
            window.location.reload();
        }
        else{
            this.notificationModel.SetError(x.message);
        }
    });
}
}
