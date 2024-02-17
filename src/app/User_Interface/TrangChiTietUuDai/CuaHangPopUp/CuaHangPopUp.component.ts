import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Branch } from 'src/app/Models/Branch';
import { BranchService } from 'src/app/Services/BranchService/Branch.service';

@Component({
  selector: 'app-CuaHangPopUp',
  templateUrl: './CuaHangPopUp.component.html',
  styleUrls: ['./CuaHangPopUp.component.css']
})
export class CuaHangPopUpComponent implements OnInit {

    public popupCondition:boolean = false;
    public listBranchs: Branch[] = [];
  constructor(
    private branchService: BranchService
  ) { }

  ngOnInit() {
  }
  public Showpopup(promotionId?:string){

      this.popupCondition = !this.popupCondition;
      this.GetBrachByPromotionId(promotionId ?? "");
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
  public GetBrachByPromotionId(promotionId:string){
        this.branchService.Branch_ByPromotionId(promotionId)
        .subscribe(x => {
            this.listBranchs = x;
        });
  }
}
