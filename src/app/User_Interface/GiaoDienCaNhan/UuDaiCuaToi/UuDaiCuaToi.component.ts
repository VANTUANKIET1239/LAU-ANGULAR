import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';
import { ComponentBase } from 'src/app/ComponentBase/componentBase';
import { Promotion } from 'src/app/Models/Promotion';
import { PromotionService } from 'src/app/Services/PromotionService/Promotion.service';
import { LoadingScreenComponent } from 'src/app/UiTools/Loading/LoadingScreen/LoadingScreen.component';

@Component({
  selector: 'app-UuDaiCuaToi',
  templateUrl: './UuDaiCuaToi.component.html',
  styleUrls: ['./UuDaiCuaToi.component.css']
})
export class UuDaiCuaToiComponent extends ComponentBase implements OnInit,AfterViewInit {



  @ViewChild('loading') public loading!: LoadingScreenComponent;
  constructor(
      private promotionService: PromotionService,
      private cdr: ChangeDetectorRef
  ) {
        super();
  }
  public listPromotion:Promotion[] = [];
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.loading.SetLoading(true);
    //let user :User = JSON.parse(localStorage.getItem('user') || '');
    this.promotionService.GetPromotions_ByUser()
    .pipe(
      finalize(() => {
        this.loading.SetLoading(false);
      })
    )
    .subscribe( x =>{
          this.listPromotion = x;

    });
    this.cdr.detectChanges();
  }
}
