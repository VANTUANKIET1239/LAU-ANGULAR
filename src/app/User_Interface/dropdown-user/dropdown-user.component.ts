import { AfterViewChecked, Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserAuthService } from 'src/app/Services/UserAuth/UserAuth.service';

@Component({
  selector: 'app-dropdown-user',
  templateUrl: './dropdown-user.component.html',
  styleUrls: ['./dropdown-user.component.css']
})
export class DropdownUserComponent implements OnInit, AfterViewChecked{
  UserInfo: User = new User();
  ImageUrl: string | Uint8Array = '';
  constructor(
    private route:Router,
    private userService: UserAuthService,
    private sanitizer:DomSanitizer,
    private cdr: ChangeDetectorRef
  ){

  }
  ngAfterViewChecked(): void {

  }
  ngOnInit(): void {
    console.log(this.ImageUrl);
    this.GetCurrentUser();
  }
  public GetCurrentUser(){
      this.userService.GetUser().subscribe(x => {
          this.UserInfo = x;
          this.ImageUrl = x.userImage;

      });
  }
  // ConvertByte2Url(imageData: Uint8Array | null){
  //   if(imageData)
  //   {
  //     const blob = new Blob([imageData], { type: 'image/jpeg' });
  //     const imageUrl = URL.createObjectURL(blob);
  //     let base64 = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  //     return base64;
  //   }
  //   return '';
  // }
  // getImageSource(imageData: Uint8Array | null): string {
  //   if (imageData && imageData.length > 0) {
  //     const base64String = this.arrayBufferToBase64(imageData);
  //     return `data:image/jpeg;base64,${base64String}`; // Adjust the image type as needed
  //   }
  //   return ''; // Return empty string if there's no image data
  // }
  // arrayBufferToBase64(buffer: Uint8Array | null): string {
  //   let binary = '';
  //   buffer?.forEach(byte => {
  //     binary += String.fromCharCode(byte);
  //   });
  //   return btoa(binary);
  // }
  // arrayBufferToBase64(buffer: any) {
  //   let binary = '';
  //   const bytes = new Uint8Array(buffer);
  //   const len = bytes.byteLength;
  //   for (let i = 0; i < len; i++) {
  //     binary += String.fromCharCode(bytes[i]);
  //   }
  //   return btoa(binary);
  // }
    public Logout(){
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      this.route.navigate(["/DangNhap"]).then(x => {
        window.location.reload();
    });

  }
}
