import { UserAuthService } from 'src/app/Services/UserAuth/UserAuth.service';
import { User } from './../../../Models/User';
import { AddressService } from './../../../Services/AddressService/Address.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Address } from 'src/app/Models/Address';
import { ThemDiaChiPopUpComponent } from './ThemDiaChiPopUp/ThemDiaChiPopUp.component';
import { XacNhanXoaPopUpComponent } from 'src/app/UiTools/XacNhanXoaPopUp/XacNhanXoaPopUp.component';
import { LoadingScreenComponent } from 'src/app/UiTools/Loading/LoadingScreen/LoadingScreen.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-SoDiaChi',
  templateUrl: './SoDiaChi.component.html',
  styleUrls: ['./SoDiaChi.component.css']
})
export class SoDiaChiComponent implements OnInit,AfterViewInit {
  public listAddress :Address[] = [];
  public ispopup: boolean = false;
  public isScrollLocked:boolean = false;
  public test:string = '';
  @ViewChild('AddressPopup') public addressPopup!: ThemDiaChiPopUpComponent;
  @ViewChild('XacNhanXoa') public xacNhanXoaPopup!: XacNhanXoaPopUpComponent;
  @ViewChild('loading') public loading!: LoadingScreenComponent;
  constructor(
        private addressService: AddressService,
        private userService: UserAuthService,
        private cdr: ChangeDetectorRef,

  ) { }
  ngAfterViewInit(): void {
    this.loading.SetLoading(true);
    let user :User = JSON.parse(localStorage.getItem('user') || '');
    this.addressService.GetAddress_ByUserId(user.userId)
    .pipe(
      finalize(() => {
        this.loading.SetLoading(false);
      })
    )
    .subscribe( x =>{
          this.listAddress = x;

    });
    this.cdr.detectChanges();
  }



  ngOnInit() {



  }

  EditAddress(addressId:string){
    this.addressPopup.OpenEditAddress(addressId);
  }
  DeleteAddress(addressId:string){
      if(addressId){
          this.addressService.Address_Del(addressId).subscribe(res => {
              if(res.success){
                alert("Xóa địa chỉ thành công");
            }
            window.location.reload();
          });
      }
  }

  // public showpopup(){
  //   this.ispopup = !this.ispopup;
  //   this.lockScroll(this.ispopup);
  // }
  // public lockScroll(ispopup:boolean) {
  //   this.isScrollLocked = ispopup;
  //   if(ispopup){
  //     document.body.style.overflow = 'hidden';
  //   }
  //   else{
  //     document.body.style.overflow = '';
  //   }
  // }


}
