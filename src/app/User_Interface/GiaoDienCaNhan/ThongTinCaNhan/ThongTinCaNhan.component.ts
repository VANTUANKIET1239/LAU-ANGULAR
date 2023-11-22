import { LoadingScreenComponent } from './../../../UiTools/Loading/LoadingScreen/LoadingScreen.component';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserAuthService } from 'src/app/Services/UserAuth/UserAuth.service';
import { formatDate } from '@angular/common';
import { NotificationModel } from 'src/app/Models/NotificationModel';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/Services/AddressService/Address.service';
@Component({
  selector: 'app-ThongTinCaNhan',
  templateUrl: './ThongTinCaNhan.component.html',
  styleUrls: ['./ThongTinCaNhan.component.css']
})
export class ThongTinCaNhanComponent implements OnInit, AfterViewInit {

  public selectedImage: string  = '../../../assets/Image/default_image.jpg';
  public UserInfo: User = new User();
  public dataform!: FormGroup;
  public fileUpload!: File;
  @ViewChild('loading') LoadingCompo!:LoadingScreenComponent
  public notificationModel: NotificationModel = new NotificationModel();
  constructor(
        private datePipe: DatePipe,
        private formbuilder:FormBuilder,
        private userService: UserAuthService,
        private cdr: ChangeDetectorRef,
        private route: Router,
        private addressService: AddressService
  ) { }
  ngAfterViewInit(): void {
    this.LoadingCompo.SetLoading(true);
    this.userService.GetUser()
    .pipe(
      finalize(() => {
        this.LoadingCompo.SetLoading(false);
      })
    )
    .subscribe({
      next: (x) => {
        this.UserInfo = x;
        this.selectedImage = 'data:image/jpeg;base64,' + x.userImage;
        this.SetFormValue(x);
        console.log(this.UserInfo);

      },
      error: (err) => {
        alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại để tiếp tục");
        this.route.navigate(['/DangNhap']);
        console.error('An error occurred:', err);
      }
    });
    this.cdr.detectChanges();
  }

  ngOnInit() {
      this.CreateNewForm();

  }
  public CreateNewForm(){
    this.dataform = this.formbuilder.group({
      email:[''],
      name: [''],
      birthDate: [new Date()],
      gender: [true],
      address: ['']
    });
  }
  public SetFormValue(user:User){

    this.addressService.GetAddress_Default(user.userId).subscribe((x :any) => {
      console.log(user.birthDate);
      this.dataform.setValue({
        email:user.email,
        name: user.name,
        birthDate: formatDate(new Date(user.birthDate), 'yyyy-MM-dd', 'en'),
        gender: user.gender,
        address: x.success ? `${x.model.addressDetail}, ${x.model.wardName}, ${x.model.districtName}, ${x.model.cityName}` : ""
      });
      console.log(this.dataform);
    });

  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
      this.fileUpload = file;
      // this.convertToUint8Array(file);
      // console.log(this.UserInfo.userImage)
    };

    reader.readAsDataURL(file);
  }
  convertToUint8Array(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const arrayBuffer = event.target.result as ArrayBuffer;
        const uintArray = new Uint8Array(arrayBuffer);
        // this.UserInfo.userImage = uintArray;
        // console.log('Uint8Array:', uintArray);
        const formData = new FormData();
        formData.append('uploadImage', file, file.name);
      }
    };

    reader.readAsArrayBuffer(file);
  }
  public EditUserInfo(){
           let formdata = this.dataform.value;
          this.UserInfo.name = formdata.name;
          this.UserInfo.gender = formdata.gender === 'true' ? true : false;
          this.UserInfo.birthDate = formdata.birthDate;
          this.LoadingCompo.SetLoading(true);
        this.userService.EditUser(this.UserInfo, this.fileUpload)
        .pipe(finalize( () =>{this.LoadingCompo.SetLoading(false)}) )
        .subscribe(res => {

           if(res.success){
            this.notificationModel.SetSuccess(res.message);
            console.log(res);
           }
           else{
              this.notificationModel.SetError(res.message);
              console.log(res);
           }
        });
  }
}
