import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MenuCategory } from 'src/app/Models/MenuCategory';
import { Promotion } from 'src/app/Models/Promotion';
import { LoadingScreenComponent } from 'src/app/UiTools/Loading/LoadingScreen/LoadingScreen.component';
import { XacNhanXoaPopUpComponent } from 'src/app/UiTools/XacNhanXoaPopUp/XacNhanXoaPopUp.component';
import { EditPromotionComponent } from '../../CRUD_Promotion/Edit-Promotion/Edit-Promotion/Edit-Promotion.component';
import { ImagePopupComponent } from 'src/app/UiTools/ImagePopup/ImagePopup/ImagePopup.component';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/Services/MenuService/Menu.service';
import { MenuCategoryService } from 'src/app/Services/MenuCategoryService/MenuCategory.service';
import { PromotionService } from 'src/app/Services/PromotionService/Promotion.service';
import { Branch } from 'src/app/Models/Branch';
import { BranchService } from 'src/app/Services/BranchService/Branch.service';
import { EditBranchComponent } from '../Edit-Branch/Edit-Branch/Edit-Branch.component';

@Component({
  selector: 'app-CRUDBranch',
  templateUrl: './CRUDBranch.component.html',
  styleUrls: ['./CRUDBranch.component.css']
})
export class CRUDBranchComponent implements OnInit {

  public categoryName: string = "";

  public  branchs: Branch[] = [];
  public branchsPage: Branch[] = [];
  public branchsview:Branch[] = [];

  public pageIndex:number = 1;
  public pageSize:number = 4;
  public totalCount: number = 0;
  public totalPage: number = 0;

  public isLoading:boolean;

  @ViewChild('XacNhanXoa') XacNhanXoa!: XacNhanXoaPopUpComponent;
  @ViewChild('loading') loading!: LoadingScreenComponent;
  @ViewChild('EditBranch') EditBranch!: EditBranchComponent;
  @ViewChild('imagepopup') imagepopup!: ImagePopupComponent;

  constructor(private route:ActivatedRoute
              ,private branchService: BranchService
              ) {
                this.isLoading = true;
              }
  ngOnChanges(changes: SimpleChanges): void {
  }

  public popupconditions:boolean = false;
  ngOnInit() {
    this.categoryName = <string> this.route.snapshot.paramMap.get("name");

    this.branchService.Branch_List().subscribe((data) =>{
      // this.menus.push(...data);
       this.branchs = data;
       this.Pagination(this.branchs);
       this.isLoading = false;
    });

  }
  public Pagination(listitem:Branch[]){

      let newitem:Branch[] = [];
      let count = 0;
      this.branchsPage = listitem;
      for(let i = (this.pageIndex - 1) * this.pageSize; i < listitem.length; i++){
        if(count == this.pageSize){
            break;
        }
        newitem.push(listitem[i]);
        count++;

     }
     this.totalCount = this.branchsPage.length;
     this.totalPage = Math.ceil(this.totalCount/this.pageSize) == 0 ? 1 : Math.ceil(this.totalCount/this.pageSize);
      this.branchsview = newitem;

  }
  public ChangePage(event:any):void{
      this.pageIndex = event;
      this.Pagination(this.branchsPage);
  }
  public ShowHidePopUpMenu(){
     this.EditBranch.HideorShowPopup();
  }
  public ShowHidePopUpMenuEdit(promotion:Branch){
    this.EditBranch.OpenEdit(promotion.branch_Id);
  }
  public ShowHideRemoveConfirm(removePromotion:Branch){
      this.XacNhanXoa.ShowOrHidePopUp2(removePromotion.branch_Id);
  }

  public onSearch(content:string){
     var contentuppdercase = content.toUpperCase();
     let searchlist:Branch[] = [];
     searchlist = this.branchs.filter(x => x.branchName.toUpperCase().includes(contentuppdercase));
     this.pageIndex = 1;
     this.Pagination(searchlist);
  }
  onRemove(itemId:string){
      this.branchService.Branch_Del(itemId).subscribe((response) => {
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



}
