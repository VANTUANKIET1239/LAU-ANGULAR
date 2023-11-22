import { MenuService } from 'src/app/Services/MenuService/Menu.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Menu } from 'src/app/Models/Menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-XacNhanXoaPopUp',
  templateUrl: './XacNhanXoaPopUp.component.html',
  styleUrls: ['./XacNhanXoaPopUp.component.css']
})
export class XacNhanXoaPopUpComponent implements OnInit {

  @Output() public onRemoveItem = new EventEmitter();
  @Input() public removeItemDataId:string = '';
  public hidePopUp: boolean = false;
  public removeId: string = '';
  constructor() { }
  ngOnInit() {
  }
  public RemoveMenu(){
      this.onRemoveItem.emit(this.removeItemDataId);
  }
  public ShowOrHidePopUp(){
    this.hidePopUp = !this.hidePopUp;
  }
  public LoadComponent(){
    window.location.reload();
  }
  public ShowOrHidePopUp2(id:string){
    this.removeItemDataId = id;
    this.hidePopUp = !this.hidePopUp;
  }
}
