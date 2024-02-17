import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Promotion } from 'src/app/Models/Promotion';
import { PromotionService } from 'src/app/Services/PromotionService/Promotion.service';
import { CuaHangPopUpComponent } from './CuaHangPopUp/CuaHangPopUp.component';
import { DoiUuDaiPopUpComponent } from './DoiUuDaiPopUp/DoiUuDaiPopUp.component';
import { ComponentBase } from 'src/app/ComponentBase/componentBase';

@Component({
  selector: 'app-TrangChiTietUuDai',
  templateUrl: './TrangChiTietUuDai.component.html',
  styleUrls: ['./TrangChiTietUuDai.component.css']
})
export class TrangChiTietUuDaiComponent extends ComponentBase implements OnInit {

  public promotionModel:Promotion = new Promotion();
  constructor(private route: ActivatedRoute
              , private promotionService: PromotionService
    ) {
        super();
   }
  public ispopupCH = false;
  public ispopupUuDai = false;
  public isScrollLocked = false;
   @ViewChild("CuaHangPopUp") public CuaHangPopUp!:CuaHangPopUpComponent;
   @ViewChild("DoiUuDaiPopUp") public DoiUuDaiPopUp!:DoiUuDaiPopUpComponent;
  ngOnInit() {
    this.route.params.subscribe(params => {
      // Access the 'id' parameter
      let id = params['id'];
      this.promotionService.GetPromotion(id).subscribe(x => {
            this.promotionModel = x;
      });
      // Do something with the id
    });
  }


}
