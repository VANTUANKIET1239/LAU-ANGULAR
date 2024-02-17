import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/Models/Branch';
import { NotificationModel } from 'src/app/Models/NotificationModel';
import { BranchService } from 'src/app/Services/BranchService/Branch.service';
import { PromotionService } from 'src/app/Services/PromotionService/Promotion.service';

@Component({
  selector: 'app-AddToBranch',
  templateUrl: './AddToBranch.component.html',
  styleUrls: ['./AddToBranch.component.css']
})
export class AddToBranchComponent implements OnInit {

  public hidePopUp:boolean = false;
  public listBranch:Branch[] = [];
  listBranchChecking: { [key: string]: boolean } = {};
  public promotionId: string = '';
  public notificationModel: NotificationModel = new NotificationModel();
  constructor(
      private branchService: BranchService,
      private promotionService: PromotionService
  ) { }

  ngOnInit() {

  }
  public Showpopup(promotionId?:string){

      this.hidePopUp = !this.hidePopUp;
      if(this.hidePopUp){
        this.promotionId = promotionId ?? "";
        this.branchService.Branch_ListExcept(this.promotionId).subscribe(x => {
          this.listBranch = x;
      });
      }
      this.lockScroll(this.hidePopUp);
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
  onCheckBranch(event:any,branchId:string){
    let branchCheck = event.target.checked;
    // if(this.listBranchChecking[branchId]){
    //     this.listBranchChecking[branchId] = false;
    // }
    // else{
    //   this.listBranchChecking[branchId] = true;
    // }
    this.listBranchChecking[branchId] = branchCheck;
    console.log(this.listBranchChecking);
  }
  AddToBranchs(){
      let branchs = Object.keys(this.listBranchChecking).filter(x => this.listBranchChecking[x]);
      if(branchs.length == 0){
            this.notificationModel.SetError("Chưa chọn chi nhánh áp dụng ưu đãi");
            return;
      }
      this.promotionService.Promotion_AddToBranch(branchs, this.promotionId).subscribe(x => {
            if(x.success){
                alert(x.message);
                window.location.reload();
            }
            else{
                this.notificationModel.SetError(x.message);
            }
      });
  }
}
