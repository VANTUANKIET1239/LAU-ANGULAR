import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ImagePopup',
  templateUrl: './ImagePopup.component.html',
  styleUrls: ['./ImagePopup.component.css']
})
export class ImagePopupComponent implements OnInit {

  public hidePopUp:boolean = false;
  public image!: string | Uint8Array;
  constructor() { }

  ngOnInit() {
      if(!this.image){
        this.image = '../../../../assets/Image/DefaultImage.png';
      }
  }
  public Showpopup(type?:string){
      this.hidePopUp = !this.hidePopUp;
      this.lockScroll(this.hidePopUp);
     // this.HideorShowPopup();
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
    public SetImage(image: string | Uint8Array){
      this.image = 'data:image/jpeg;base64,' + image;
    }
}
