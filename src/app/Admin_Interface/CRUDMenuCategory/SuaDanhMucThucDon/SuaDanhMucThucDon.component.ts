import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Menu } from 'src/app/Models/Menu';
import { MenuCategory } from 'src/app/Models/MenuCategory';
import { MenuCategoryService } from 'src/app/Services/MenuCategoryService/MenuCategory.service';
import { MenuService } from 'src/app/Services/MenuService/Menu.service';

@Component({
  selector: 'app-SuaDanhMucThucDon',
  templateUrl: './SuaDanhMucThucDon.component.html',
  styleUrls: ['./SuaDanhMucThucDon.component.css']
})
export class SuaDanhMucThucDonComponent implements OnInit {

  public selectedImage: string  = '';

  @ViewChild("hinhanhmenu",{ static: false }) public elelinkimg!:ElementRef<HTMLInputElement>;
  public dataform!: FormGroup;
  public hidePopUp:boolean = false;
  public menuCategoryEdit!:MenuCategory;
  constructor(private formbuilder:FormBuilder,
            private menuService:MenuService,
            private menuCategoryService: MenuCategoryService ) {

  }
  ngAfterViewInit(): void {
  }

  ngOnInit() {

  }
  onLinkSelected() {
      this.selectedImage = this.elelinkimg.nativeElement.value;
  }

  public HideorShowPopup(model?: MenuCategory){
      if(model){
        this.menuCategoryEdit = model;
        this.CreateNewForm();
      }
      this.hidePopUp = !this.hidePopUp;
  }

  public CreateNewForm(){
      this.dataform = this.formbuilder.group({
        menuCategoryName: [this.menuCategoryEdit.categoryName],
        menuCategoryId: [this.menuCategoryEdit.menuCategory_Id],
        state: [this.menuCategoryEdit.state],
      });


  }
  public EditNewMenu(){
     if(this.dataform.valid){
      let newmenuform = this.dataform.value;
       let newMenu:MenuCategory = new MenuCategory(
            newmenuform.menuCategoryId,
            newmenuform.menuCategoryName,
            newmenuform.state,
       );
      this.menuCategoryService.EditMenuCategory(newMenu).subscribe((data) =>{
          let check = data.success;
          if(check){
            this.HideorShowPopup();
            alert("Chỉnh sửa danh mục thực đơn thành công!");
            this.LoadComponent();
          }
      });

     }
  }
  public LoadComponent(){
    window.location.reload();
  }
}
