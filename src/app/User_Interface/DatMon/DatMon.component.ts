import { finalize, pipe } from 'rxjs';
import { MenuCategory } from './../../Models/MenuCategory';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from 'src/app/Models/Menu';
import { MenuCategoryService } from 'src/app/Services/MenuCategoryService/MenuCategory.service';
import { MenuService } from 'src/app/Services/MenuService/Menu.service';
import { LoadingScreenComponent } from 'src/app/UiTools/Loading/LoadingScreen/LoadingScreen.component';

@Component({
  selector: 'app-DatMon',
  templateUrl: './DatMon.component.html',
  styleUrls: ['./DatMon.component.css']
})
export class DatMonComponent implements OnInit {

  public quantity:number = 0;
  public haveQuantity:boolean = false;
  public hotdealMenu: Menu[] = [];
  public BestSellerMenu: Menu[] = [];
  public MenusByCate: Menu[] = [];
  public MenuCategoryItems: MenuCategory[] = [];

  @ViewChild('loading') loading!: LoadingScreenComponent;
  constructor(
    private MenuService: MenuService,
    private MenuCategoryService: MenuCategoryService
  ) { }

  ngOnInit() {
    this.GetBestSellerMenus();
    this.GetHotDealMenus();
    this.GetMenuCates();
  }
  public GiamSL(){
      if(this.quantity > 1){
          this.quantity -= 1;
      }
      else if(this.quantity == 1){
          this.quantity -= 1;
          this.haveQuantity = false;
      }
  }
  public TangSL(){
      this.quantity += 1;
        if(this.quantity > 0){
          this.haveQuantity = true;
      }

  }

  public GetBestSellerMenus(){
      this.MenuService.GetBestSellerMenus().subscribe(x =>{
          this.BestSellerMenu = x;
      });
  }
  public GetHotDealMenus(){
    this.MenuService.GetHotDealMenus().subscribe(x =>{
        this.hotdealMenu = x;
    });

}
public GetMenuCates(){
  this.MenuCategoryService.GetMenuCategories().subscribe(x =>{
      this.MenuCategoryItems = x;
  });

}

public onClickCateItem(cateId: string){
  this.loading.SetLoading(true);
  this.MenuService.GetMenusByCate(cateId)
  .pipe(finalize( () =>{this.loading.SetLoading(false)}) )
  .subscribe(x => {
      this.MenusByCate = x;
  });
}
}
