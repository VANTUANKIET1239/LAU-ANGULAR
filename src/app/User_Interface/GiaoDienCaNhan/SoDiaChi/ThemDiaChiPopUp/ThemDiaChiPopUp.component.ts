import { City } from './../../../../Models/Ctity';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/Models/Address';
import { District } from 'src/app/Models/District';
import { NotificationModel } from 'src/app/Models/NotificationModel';
import { Ward } from 'src/app/Models/Ward';
import { AddressService } from 'src/app/Services/AddressService/Address.service';
import { CityService } from 'src/app/Services/CityService/City.service';
import { DistrictService } from 'src/app/Services/DistrictService/District.service';
import { WardService } from 'src/app/Services/WardService/Ward.service';

@Component({
  selector: 'app-ThemDiaChiPopUp',
  templateUrl: './ThemDiaChiPopUp.component.html',
  styleUrls: ['./ThemDiaChiPopUp.component.css']
})
export class ThemDiaChiPopUpComponent implements OnInit {


    public dataform!: FormGroup;
    public listDistricts:District[] = [];
    public listCities:City[] = [];
    public listWards:Ward[] = [];
    conditionPopup:boolean = false;
    cityChange:boolean = true;
    districtChange: boolean = true;
    saveTitle:string = '';
    public notificationModel: NotificationModel = new NotificationModel();
    public addressModel = new Address();
    constructor(private formbuilder:FormBuilder,
                private districtService : DistrictService,
                private cityService: CityService,
                private wardService: WardService,
                private addressService: AddressService
      ) {


      }
    @Output() public hidepop = new EventEmitter();

    ngOnInit() {
      this.CreateNewForm();
        this.LoadLocation();
    }
    public Showpopup(type?:string){

      this.saveTitle = "Sửa địa chỉ";
      this.conditionPopup = !this.conditionPopup;
        this.lockScroll(this.conditionPopup);
        if(type && type != 'edit'){
          this.addressModel =  new Address();
          this.dataform.reset();
          this.saveTitle = "Thêm địa chỉ";
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
    OpenEditAddress(addressId:string){

      this.addressService.GetAddress_ById(addressId).subscribe(x => {
          this.addressModel = x;
          this.CreateNewForm(this.addressModel);
          this.LoadLocationForEdit(this.addressModel);
          this.cityChange = false;
          this.districtChange = false;
          this.Showpopup('edit');

      });

    }

    LoadLocation(){
      this.cityService.GetCities().subscribe(res => {
          this.listCities = res;
          console.log(this.listCities);
      });
    }
    LoadLocationForEdit(address:Address){
      this.districtService.GetDistrict_ByCityId(address.city).subscribe(res => {
        this.listDistricts = res;
       // console.log(this.listCities);
    });
    this.wardService.GetWards_ByDistrictId(address.district).subscribe(res => {
      this.listWards = res;
      //.log(this.listCities);
  });
    }


    public CreateNewForm(address?:Address){
      this.dataform = this.formbuilder.group({
        name:[address?.name ?? '', Validators.required],
        phone:[address?.phone ??'', Validators.required],
        email:[address?.email ??'', Validators.required],
        addressDetail:[address?.addressDetail ??'', Validators.required],
        city: [address?.city ??0, Validators.required],
        district:[address?.district ??0, Validators.required],
        ward: [address?.ward ??0, Validators.required],
        isDefault:[address?.isDefault ??false]
      });
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

  onChangeWard(event:any){
    console.log(event);
  }

  FormValueValidation():boolean{
    if (this.dataform.invalid) {
      if (this.dataform.controls['name'].hasError('required')) {
        this.notificationModel.SetError("Họ tên đang bỏ trống");
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
      return true;
    }
    return false;
  }
  ChangeDefault(event:any){
    console.log(event.target.checked);
    let curDefault = event.target.checked;
    this.dataform.patchValue({
      isDefault: curDefault
    });
    console.log(this.dataform);
}
  SaveAddress(){
    console.log(this.addressModel);
    if(this.FormValueValidation()){
          return;
    }
    let formValue = this.dataform.value;
    console.log(formValue);

    this.addressModel.addressDetail = formValue.addressDetail;
    this.addressModel.city = formValue.city;
    this.addressModel.district = formValue.district;
    this.addressModel.ward = formValue.ward;
    this.addressModel.phone = formValue.phone;
    this.addressModel.name = formValue.name;
    this.addressModel.email = formValue.email;
    this.addressModel.isDefault = formValue.isDefault;
    console.log(this.addressModel);
    if(this.addressModel.address_Id){
        this.addressService.Address_Upd(this.addressModel).subscribe(res => {
          if(res.success){
              alert("Cật nhật địa chỉ thành công");
              this.dataform.reset();
          }
          window.location.reload();
      });
    }
    else{
      this.addressService.Address_Ins(this.addressModel).subscribe(res => {
        if(res.success){
            alert("Thêm địa chỉ thành công");
            this.dataform.reset();
        }
        window.location.reload();
    });
    }
  }


}
