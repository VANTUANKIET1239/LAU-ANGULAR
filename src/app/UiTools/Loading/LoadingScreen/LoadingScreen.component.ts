import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-LoadingScreen',
  templateUrl: './LoadingScreen.component.html',
  styleUrls: ['./LoadingScreen.component.css']
})
export class LoadingScreenComponent implements OnInit {

  public isLoading: boolean = false;
  constructor() { }


  public SetLoading(type:boolean){
      this.isLoading = type;
  }
  ngOnInit() {

  }

}
