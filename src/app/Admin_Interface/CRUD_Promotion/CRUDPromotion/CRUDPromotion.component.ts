import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MenuCategory } from 'src/app/Models/MenuCategory';
import { SuaDanhMucThucDonComponent } from '../../CRUDMenuCategory/SuaDanhMucThucDon/SuaDanhMucThucDon.component';
import { ActivatedRoute } from '@angular/router';
import { ThemThucDonPopUpComponent } from '../../CRUDMenu/ThemThucDonPopUp/ThemThucDonPopUp.component';
import { XacNhanXoaPopUpComponent } from 'src/app/UiTools/XacNhanXoaPopUp/XacNhanXoaPopUp.component';
import { MenuService } from 'src/app/Services/MenuService/Menu.service';
import { MenuCategoryService } from 'src/app/Services/MenuCategoryService/MenuCategory.service';
import { Promotion } from 'src/app/Models/Promotion';
import { PromotionService } from 'src/app/Services/PromotionService/Promotion.service';
import { ImagePopupComponent } from 'src/app/UiTools/ImagePopup/ImagePopup/ImagePopup.component';
import { EditPromotionComponent } from '../Edit-Promotion/Edit-Promotion/Edit-Promotion.component';
import { LoadingScreenComponent } from 'src/app/UiTools/Loading/LoadingScreen/LoadingScreen.component';
import { AddToBranchComponent } from '../AddToBranchPopup/AddToBranch/AddToBranch.component';

@Component({
  selector: 'app-CRUDPromotion',
  templateUrl: './CRUDPromotion.component.html',
  styleUrls: ['./CRUDPromotion.component.css']
})
export class CRUDPromotionComponent implements OnInit {

  public categoryName: string = "";

  public promotions: Promotion[] = [];
  public promotionsPage: Promotion[] = [];
  public promotionsview:Promotion[] = [];

  public pageIndex:number = 1;
  public pageSize:number = 4;
  public totalCount: number = 0;
  public totalPage: number = 0;

  public removeItemData: MenuCategory  = new MenuCategory('','',true);
  public isLoading:boolean;

  @ViewChild('XacNhanXoa') XacNhanXoa!: XacNhanXoaPopUpComponent;
  @ViewChild('loading') loading!: LoadingScreenComponent;
  @ViewChild('EditPromotion') EditPromotion!: EditPromotionComponent;
  @ViewChild('imagepopup') imagepopup!: ImagePopupComponent;
  @ViewChild('AddToBranch') AddToBranch!: AddToBranchComponent;

  constructor(private route:ActivatedRoute
              ,private promotionService: PromotionService
              ) {
                this.isLoading = true;
              }
  ngOnChanges(changes: SimpleChanges): void {
  }

  public popupconditions:boolean = false;
  ngOnInit() {
    this.categoryName = <string> this.route.snapshot.paramMap.get("name");

    this.promotionService.GetPromotions().subscribe((data) =>{
      // this.menus.push(...data);
       this.promotions = data;
       this.Pagination(this.promotions);
       this.isLoading = false;
    });

  }
  public Pagination(listitem:Promotion[]){

      let newitem:Promotion[] = [];
      let count = 0;
      this.promotionsPage = listitem;
      for(let i = (this.pageIndex - 1) * this.pageSize; i < listitem.length; i++){
        if(count == this.pageSize){
            break;
        }
        newitem.push(listitem[i]);
        count++;

     }
     this.totalCount = this.promotionsPage.length;
     this.totalPage = Math.ceil(this.totalCount/this.pageSize) == 0 ? 1 : Math.ceil(this.totalCount/this.pageSize);
      this.promotionsview = newitem;

  }
  public ChangePage(event:any):void{
      this.pageIndex = event;
      this.Pagination(this.promotionsPage);
  }
  public ShowHidePopUpMenu(){
     this.EditPromotion.HideorShowPopup();
  }
  public ShowHidePopUpMenuEdit(promotion:Promotion){
    this.EditPromotion.OpenEdit(promotion.promotion_Id);
  }
  public ShowHideRemoveConfirm(removePromotion:Promotion){
      this.XacNhanXoa.ShowOrHidePopUp2(removePromotion.promotion_Id);
  }

  public onSearch(content:string){
     var contentuppdercase = content.toUpperCase();
     let searchlist:Promotion[] = [];
     console.log(this.promotions);
     searchlist = this.promotions.filter(x => x.promotionName.toUpperCase().includes(contentuppdercase));
     this.pageIndex = 1;
     this.Pagination(searchlist);
  }
  onRemove(itemId:string){
      this.promotionService.RemovePromotion(itemId).subscribe((response) => {
          if(response.success){
            alert("Xóa thành công");
            this.XacNhanXoa.ShowOrHidePopUp();
            this.XacNhanXoa.LoadComponent();
          }
      });

  }
  openImage(image:string | Uint8Array){
      this.imagepopup.SetImage(image);
      this.imagepopup.Showpopup();
  }
  AddPromotionToBranch(){

  }


}
