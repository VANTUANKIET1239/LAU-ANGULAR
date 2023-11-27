import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationModel } from 'src/app/Models/NotificationModel';
import { Promotion } from 'src/app/Models/Promotion';
import { PromotionDetail } from 'src/app/Models/Promotion_Detail';
import { PromotionService } from 'src/app/Services/PromotionService/Promotion.service';

@Component({
  selector: 'app-Edit-Promotion',
  templateUrl: './Edit-Promotion.component.html',
  styleUrls: ['./Edit-Promotion.component.css']
})
export class EditPromotionComponent implements OnInit {
  public dataform!: FormGroup;
  public hidePopUp!:boolean;
  public imagePath!:string;
  public PromotionImage: string  = "../../../../../assets/Image/DefaultImage.png";
  public saveTitle: string = '';
  public PromotionModel: Promotion = new Promotion();
  public notificationModel: NotificationModel = new NotificationModel();

  @ViewChild("hinhanhmenu",{ static: false }) public elelinkimg!:ElementRef<HTMLInputElement>;
  public fileUpload!: File;
  constructor(
    private formbuilder:FormBuilder,
    private promotionService: PromotionService
  ) {
    this.CreateNewForm();
  }

  ngOnInit() {
    console.log(this.PromotionImage);
  }
  get contentArrays(): FormArray {

    return this.dataform.get('contentArrays') as FormArray;
  }
  public HideorShowPopup(){


}
  public CreateNewForm(promotion?: Promotion){
      this.dataform = this.formbuilder.group({
        promotionName: [promotion?.promotionName ?? '', [Validators.required]],
        expirationDate  : [promotion?.expirationDate ? formatDate(new Date(promotion?.expirationDate), 'yyyy-MM-dd', 'en') : formatDate(new Date(), 'yyyy-MM-dd', 'en')],
        createDate: [promotion?.createDate ? formatDate(new Date(promotion?.createDate), 'yyyy-MM-dd', 'en') : formatDate(new Date(), 'yyyy-MM-dd', 'en')],
        contentArrays: this.formbuilder.array([])
      });
  }
  PatchContentValue(model:Promotion){
    const arr = this.contentArrays;
    arr.clear();
    if(Array.isArray(model.promotionDetails)){
      console.log(arr);
      model.promotionDetails.forEach(x => {
        const medicineGroup = this.formbuilder.group({
          promotionDetail_Id:[x.promotionDetail_Id,Validators.required],
          content: [x.content],
        });
        arr.push(medicineGroup)
    });
  }
}
  onLinkSelected() {
    if(this.elelinkimg.nativeElement.value == ''){
      alert("Chưa thêm hình vào");
    }
    else{
      this.PromotionImage = this.elelinkimg.nativeElement.value;
    }
}
addContent(){
  const formArray = this.contentArrays;
    const contentGroup = this.formbuilder.group({
      promotionDetail_Id:[''] ,
      content: ['',Validators.required],
    });
    formArray.push(contentGroup);
    console.log(formArray);

}
onFileSelected(event: any) {
  const file: File = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e: any) => {
    this.PromotionImage = e.target.result;
    this.fileUpload = file;
    this.imagePath = file.name;

  };

  reader.readAsDataURL(file);
}
  DeleteContent(index:number){
      var contentArr = this.contentArrays;
      contentArr.removeAt(index);
  }


  OpenEdit(promotionId:string){

    this.promotionService.GetPromotion(promotionId).subscribe(x => {
        this.PromotionModel = x;
        this.PromotionImage = 'data:image/jpeg;base64,' + x.promotionImage;
        this.CreateNewForm(this.PromotionModel);
        this.PatchContentValue(this.PromotionModel);
        this.imagePath = this.PromotionModel.imagePath;
        this.Showpopup('edit');
    });

  }
  public Showpopup(type?:string){
    this.hidePopUp = !this.hidePopUp;
    this.lockScroll(this.hidePopUp);
    this.saveTitle = "Sửa ưu đãi";
   // this.HideorShowPopup();
      if(type && type != 'edit'){
        this.PromotionModel =  new Promotion();
        this.dataform.reset();
        this.contentArrays.clear();
        this.dataform.patchValue({
          expirationDate  : formatDate(new Date(), 'yyyy-MM-dd', 'en'),
          createDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        });
        console.log(this.dataform);
        this.PromotionImage = "../../../../../assets/Image/DefaultImage.png";
        this.saveTitle = "Thêm ưu đãi";
      }

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

  SavePromotion(){
      if(this.FormValueValidation()){
          return;
      }
      let formValue = this.dataform.value;
      let contentArr = this.contentArrays;
      let modelDT: PromotionDetail[] = [];
      contentArr.controls.forEach(x => {
        let item = x.value;
        let modelDTitem:PromotionDetail = new PromotionDetail();
        modelDTitem.promotionDetail_Id = item.promotionDetail_Id;
        modelDTitem.content = item.content;
        modelDT.push(modelDTitem);
      });
      this.PromotionModel.promotionName = formValue.promotionName;
      this.PromotionModel.createDate = formValue.createDate;
      this.PromotionModel.expirationDate = formValue.expirationDate;
      this.PromotionModel.promotionDetails = modelDT;
      this.PromotionModel.ImagePath = this.imagePath;
      console.log(this.PromotionModel);
      var kiet = this.PromotionModel;
        if(!this.PromotionModel.promotion_Id || this.PromotionModel.promotion_Id == ''){
            this.promotionService.CreatePromotion(this.PromotionModel,this.fileUpload).subscribe(res => {
              if(res.success){
                alert("Thêm ưu đãi thành công");
                this.dataform.reset();
                }
                window.location.reload();
          });
        }
        else{
            this.promotionService.UpdatePromotion(this.PromotionModel,this.fileUpload).subscribe(res => {
              if(res.success){
                alert("Cập nhật ưu đãi thành công");
                this.dataform.reset();
                }
                window.location.reload();
          });
        }
  }
  FormValueValidation():boolean{

      if (this.dataform.controls['promotionName'].hasError('required')) {
        this.notificationModel.SetError("Tên ưu đãi đang bỏ trống");
        return true;
      }
      else if (this.imagePath == '' || this.imagePath == undefined) {
        this.notificationModel.SetError("Chưa chọn hình ảnh cho ưu đãi");
        return true;
      }
      else if(this.contentArrays.length == 0){
        this.notificationModel.SetError("Cần thêm các nội dung cho ưu đãi");
        return true;
      }
      else if (this.contentArrays.controls.some(x => x.get('content')?.hasError('required'))) {
        this.notificationModel.SetError("Thông tin nội dung ưu đãi chưa được nhập");
        return true;
      }
      else if (new Date(this.dataform.value.createDate) > new Date(this.dataform.value.expirationDate)) {
        this.notificationModel.SetError("ngày hết hạn đang nhỏ hơn ngày tạo");
        return true;
      }

    return false;
  }


}
