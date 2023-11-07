import { MenuService } from './../../Services/MenuService/Menu.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/Models/Menu';
import { MenuCategory } from 'src/app/Models/MenuCategory';
import { MenuCategoryService } from 'src/app/Services/MenuCategoryService/MenuCategory.service';
import { XacNhanXoaPopUpComponent } from 'src/app/UiTools/XacNhanXoaPopUp/XacNhanXoaPopUp.component';

@Component({

  selector: 'app-CRUDMenu',
  templateUrl: './CRUDMenu.component.html',
  styleUrls: ['./CRUDMenu.component.css']
})
export class CRUDMenuComponent implements OnInit {
  public categoryName: string = "";
  public menus: Menu[] = [];
  public menusPage: Menu[] = [];
  public menusview:Menu[] = [];
  public menucategories: MenuCategory[] = [];
  public selectedcategory:string = '';
  public pageIndex:number = 1;
  public pageSize:number = 4;
  public totalCount: number = 0;
  public totalPage: number = 0;
  public menuEdit:Menu = new Menu('','','',0,true,true,true);
  public removeItemData: Menu  = new Menu('','','',0,true,true,true);
  public isLoading:boolean;
  @ViewChild('XacNhanXoa') XacNhanXoa!: XacNhanXoaPopUpComponent;
  constructor(private route:ActivatedRoute,
              private menuService: MenuService,
              private menucategoryservice: MenuCategoryService) {
                this.isLoading = true;
              }

  public popupconditions:boolean = false;
  public editpopupconditions:boolean = false;
  public removeConfirmPopupCondition: boolean = false;
  ngOnInit() {
    this.categoryName = <string> this.route.snapshot.paramMap.get("name");
    this.menuService.GetMenus().subscribe((data) =>{
      // this.menus.push(...data);
       this.menus = data;
       this.Pagination(this.menus);
       this.isLoading = false;
    });
   this.onInitMenuCategories();

  }
  public onInitMenuCategories(){
    this.menucategoryservice.GetMenuCategories().subscribe((data) => {
      this.menucategories = data;
    });
  }
  public Pagination(listitem:Menu[]){
      let newitem:Menu[] = [];
      let count = 0;
      this.menusPage = listitem;
      for(let i = (this.pageIndex - 1) * this.pageSize; i < listitem.length; i++){
        if(count == this.pageSize){
            break;
        }
        newitem.push(listitem[i]);
        count++;

     }
     this.totalCount = this.menusPage.length;
      this.menusview = newitem;
      this.totalPage = Math.ceil(this.totalCount/this.pageSize) == 0 ? 1 : Math.ceil(this.totalCount/this.pageSize);

  }
  public ChangePage(event:any):void{
      this.pageIndex = event;
      this.Pagination(this.menusPage);
  }

  public ShowHidePopUpMenu(){
    this.popupconditions = !this.popupconditions;
  }
  public ShowHidePopUpMenuEdit(Menu:Menu){
    this.menuEdit = Menu;
    this.editpopupconditions = !this.editpopupconditions;
  }
  public HidePopUpMenuEdit(){

    this.editpopupconditions = !this.editpopupconditions;
  }
  public HidePopUpMenuRemoveConfirm(){

    this.removeConfirmPopupCondition = !this.removeConfirmPopupCondition;
  }

  public ShowHideRemoveConfirm(removeMenu:Menu){
        this.removeItemData =  removeMenu;
        this.XacNhanXoa.ShowOrHidePopUp();
  }

  public selectedCate(menuCateId: string){
      if(menuCateId == "TB"){
         this.Pagination(this.menus);
      }
      else{
        this.menuService.GetMenusByCate(menuCateId).subscribe((data) => {
          this.pageIndex = 1;
          this.Pagination(data);
          this.isLoading = false;
        });
      }
  }

  public SearchMenu(content:string){
     var contentuppdercase = content.toUpperCase();
     let searchlist:Menu[] = [];
     searchlist = this.menus.filter(x => x.menuName.toUpperCase().includes(contentuppdercase));
     this.pageIndex = 1;
     this.Pagination(searchlist);
  }

  onRemove(item:string){
   this.menuService.GetMenu(item).subscribe(x => {
        this.menuService.RemoveMenu(x).subscribe((response) => {
          if(response.success){
            alert("Xóa thành công");
            this.XacNhanXoa.ShowOrHidePopUp();
            this.XacNhanXoa.LoadComponent();
          }
      });
   });
}

}
