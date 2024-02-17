import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Branch } from 'src/app/Models/Branch';
import { City } from 'src/app/Models/Ctity';
import { District } from 'src/app/Models/District';
import { NotificationModel } from 'src/app/Models/NotificationModel';
import { Promotion } from 'src/app/Models/Promotion';
import { PromotionDetail } from 'src/app/Models/Promotion_Detail';
import { Ward } from 'src/app/Models/Ward';
import { BranchService } from 'src/app/Services/BranchService/Branch.service';
import { CityService } from 'src/app/Services/CityService/City.service';
import { DistrictService } from 'src/app/Services/DistrictService/District.service';
import { PromotionService } from 'src/app/Services/PromotionService/Promotion.service';
import { WardService } from 'src/app/Services/WardService/Ward.service';
import { LoadingScreenComponent } from 'src/app/UiTools/Loading/LoadingScreen/LoadingScreen.component';

@Component({
  selector: 'app-Edit-Branch',
  templateUrl: './Edit-Branch.component.html',
  styleUrls: ['./Edit-Branch.component.css']
})
export class EditBranchComponent implements OnInit {

  public dataform!: FormGroup;
  public hidePopUp!:boolean;
  public imagePath!:string;
  public PromotionImage: string  = "../../../../../assets/Image/DefaultImage.png";
  public saveTitle: string = '';
  public BranchModel: Branch = new Branch();
  public notificationModel: NotificationModel = new NotificationModel();

  public listDistricts:District[] = [];
  public listCities:City[] = [];
  public listWards:Ward[] = [];
  conditionPopup:boolean = false;
  cityChange:boolean = true;
  districtChange: boolean = true;

  @ViewChild('loading') loading!: LoadingScreenComponent;
  @ViewChild("hinhanhmenu",{ static: false }) public elelinkimg!:ElementRef<HTMLInputElement>;
  public fileUpload!: File;
  constructor(
    private formbuilder:FormBuilder,
    private branchService: BranchService,
    private districtService : DistrictService,
    private cityService: CityService,
    private wardService: WardService,
  ) {
    //this.CreateNewForm();
  }

  ngOnInit() {
   // console.log(this.PromotionImage);
    this.CreateNewForm();
    this.LoadLocation();
  }
  get contentArrays(): FormArray {

    return this.dataform.get('contentArrays') as FormArray;
  }
  public HideorShowPopup(){


}
  public CreateNewForm(branch?: Branch){
    this.dataform = this.formbuilder.group({
      branchName:[branch?.branchName ?? '', Validators.required],
      phone:[branch?.phone ??'', Validators.required],
      email:[branch?.email ??'', Validators.required],
      addressDetail:[branch?.addressDetail ??'', Validators.required],
      city: [branch?.city ??0, Validators.required],
      district:[branch?.district ??0, Validators.required],
      ward: [branch?.ward ??0, Validators.required],
      openingTime:[branch?.openingTime ?? "" , Validators.required]
    });
  }
//   PatchContentValue(model:Branch){
//     const arr = this.contentArrays;
//     arr.clear();
//     if(Array.isArray(model.promotionDetails)){
//       console.log(arr);
//       model.promotionDetails.forEach(x => {
//         const medicineGroup = this.formbuilder.group({
//           promotionDetail_Id:[x.promotionDetail_Id,Validators.required],
//           content: [x.content],
//         });
//         arr.push(medicineGroup)
//     });
//   }
// }
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

    this.branchService.Branch_ById(promotionId).subscribe(x => {
        this.BranchModel = x;
        this.CreateNewForm(this.BranchModel);
        this.LoadLocationForEdit(this.BranchModel);
        this.Showpopup('edit');
    });

  }
  public Showpopup(type?:string){
    this.saveTitle = "Sửa chi nhánh";
      this.conditionPopup = !this.conditionPopup;
        this.lockScroll(this.conditionPopup);
        if(type && type != 'edit'){
          this.BranchModel =  new Branch();
          this.dataform.reset();
          this.saveTitle = "Thêm chi nhánh";
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
  onChangeCtity(event:any){
    console.log(event.target.value);
    let cityId = event.target.value;
    this.districtService.GetDistrict_ByCityId(cityId).subscribe(x => {
        this.listDistricts = x;
        this.cityChange = false;
    });
}

onChangeDistrict(event:any){
  console.log(event.target.value);
  let districtId = event.target.value;
  this.wardService.GetWards_ByDistrictId(districtId).subscribe(x => {
      this.listWards = x;
      this.districtChange = false;
  });
}
LoadLocation(){
  this.cityService.GetCities().subscribe(res => {
      this.listCities = res;
      console.log(this.listCities);
  });
}
LoadLocationForEdit(address:Branch){
      this.districtService.GetDistrict_ByCityId(address.city).subscribe(res => {
        this.listDistricts = res;
      // console.log(this.listCities);
    });
    this.wardService.GetWards_ByDistrictId(address.district).subscribe(res => {
      this.listWards = res;
      //.log(this.listCities);
    });
}
  SaveBranch(){
      if(this.FormValueValidation()){
          return;
      }
      let formValue = this.dataform.value;
      this.BranchModel.addressDetail = formValue.addressDetail;
      this.BranchModel.city = formValue.city;
      this.BranchModel.district = formValue.district;
      this.BranchModel.ward = formValue.ward;
      this.BranchModel.phone = formValue.phone;
      this.BranchModel.branchName = formValue.branchName;
      this.BranchModel.email = formValue.email;
      this.BranchModel.openingTime = formValue.openingTime;
      console.log(this.BranchModel);
      var kiet = this.BranchModel;
      this.loading.SetLoading(true);
        if(!this.BranchModel.branch_Id || this.BranchModel.branch_Id == ''){
            this.branchService.Branch_Ins(this.BranchModel)
            .pipe(finalize( () =>{this.loading.SetLoading(false)}) )
            .subscribe
            (res => {
              if(res.success){
                alert("Thêm chinh nhánh thành công");
                this.dataform.reset();
                }
                window.location.reload();
          });
        }
        else{
            this.branchService.Branch_Upd(this.BranchModel).subscribe(res => {
              if(res.success){
                alert("Cập nhật chinh nhánh thành công");
                this.dataform.reset();
                }
                window.location.reload();
          });
        }
  }
  FormValueValidation():boolean{

    if (this.dataform.invalid) {
      if (this.dataform.controls['branchName'].hasError('required')) {
        this.notificationModel.SetError("Tên chi nhánh đang bỏ trống");
      }
      else if (this.dataform.controls['phone'].hasError('required')) {
        this.notificationModel.SetError("Số điện thoại đang bỏ trống");
      }
      else if (this.dataform.controls['email'].hasError('required')) {
        this.notificationModel.SetError("Email đang bỏ trống");
      }
      else if (this.dataform.controls['addressDetail'].hasError('required')) {
        this.notificationModel.SetError("Địa chỉ cụ thể đang bỏ trống");
      }
      else if (this.dataform.controls['openingTime'].hasError('required')) {
        this.notificationModel.SetError("Giờ mở cửa đang bỏ trống");
      }
      return true;
    }
    return false;
  }


}
