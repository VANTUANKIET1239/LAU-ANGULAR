import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/Models/Menu';
import { MenuCategory } from 'src/app/Models/MenuCategory';
import { MenuCategoryService } from 'src/app/Services/MenuCategoryService/MenuCategory.service';
import { MenuService } from 'src/app/Services/MenuService/Menu.service';
import { XacNhanXoaPopUpComponent } from 'src/app/UiTools/XacNhanXoaPopUp/XacNhanXoaPopUp.component';
import { SuaDanhMucThucDonComponent } from './SuaDanhMucThucDon/SuaDanhMucThucDon.component';
import { SuaThucDonPopUpComponent } from '../CRUDMenu/SuaThucDonPopUp/SuaThucDonPopUp.component';
import { ThemThucDonPopUpComponent } from '../CRUDMenu/ThemThucDonPopUp/ThemThucDonPopUp.component';

@Component({
  selector: 'app-CRUDMenuCategory',
  templateUrl: './CRUDMenuCategory.component.html',
  styleUrls: ['./CRUDMenuCategory.component.css']
})
export class CRUDMenuCategoryComponent implements OnInit, OnChanges {

  public categoryName: string = "";

  public menuCategories: MenuCategory[] = [];
  public menuCategoriesPage: MenuCategory[] = [];
  public menuCategoriesview:MenuCategory[] = [];

  public pageIndex:number = 1;
  public pageSize:number = 4;
  public totalCount: number = 0;
  public totalPage: number = 0;

  public removeItemData: MenuCategory  = new MenuCategory('','',true);
  public isLoading:boolean;

  @ViewChild('SuaPopUp') SuaPopUp!:SuaDanhMucThucDonComponent
  @ViewChild('XacNhanXoa') XacNhanXoa!: XacNhanXoaPopUpComponent;
  @ViewChild('ThemPopUp') ThemPopUp!: ThemThucDonPopUpComponent;

  constructor(private route:ActivatedRoute,
              private menuService: MenuService,
              private menucategoryservice: MenuCategoryService) {
                this.isLoading = true;
              }
  ngOnChanges(changes: SimpleChanges): void {
  }

  public popupconditions:boolean = false;
  ngOnInit() {
    this.categoryName = <string> this.route.snapshot.paramMap.get("name");

    this.menucategoryservice.GetMenuCategories().subscribe((data) =>{
      // this.menus.push(...data);
       this.menuCategories = data;
       this.Pagination(this.menuCategories);
       this.isLoading = false;
    });

  }
  public Pagination(listitem:MenuCategory[]){

      let newitem:MenuCategory[] = [];
      let count = 0;
      this.menuCategoriesPage = listitem;
      for(let i = (this.pageIndex - 1) * this.pageSize; i < listitem.length; i++){
        if(count == this.pageSize){
            break;
        }
        newitem.push(listitem[i]);
        count++;

     }
     this.totalCount = this.menuCategoriesPage.length;
     this.totalPage = Math.ceil(this.totalCount/this.pageSize) == 0 ? 1 : Math.ceil(this.totalCount/this.pageSize);
      this.menuCategoriesview = newitem;

  }
  public ChangePage(event:any):void{
      this.pageIndex = event;
      this.Pagination(this.menuCategoriesPage);
  }
  public ShowHidePopUpMenu(){
     this.ThemPopUp.HideorShowPopup();
  }
  public ShowHidePopUpMenuEdit(Menu:MenuCategory){
    this.SuaPopUp.HideorShowPopup(Menu);
  }
  public ShowHideRemoveConfirm(removeMenu:MenuCategory){
        this.removeItemData =  removeMenu;
        this.XacNhanXoa.ShowOrHidePopUp();
  }

  public onSearch(content:string){
     var contentuppdercase = content.toUpperCase();
     let searchlist:MenuCategory[] = [];
     searchlist = this.menuCategories.filter(x => x.categoryName.toUpperCase().includes(contentuppdercase));
     this.pageIndex = 1;
     this.Pagination(searchlist);
  }
  onRemove(itemId:string){
      this.menucategoryservice.RemoveMenuCategory(itemId).subscribe((response) => {
          if(response.success){
            alert("Xóa thành công");
            this.XacNhanXoa.ShowOrHidePopUp();
            this.XacNhanXoa.LoadComponent();
          }
      });

  }


}
