import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ComponentBase } from 'src/app/ComponentBase/componentBase';
import { Promotion } from 'src/app/Models/Promotion';
import { PromotionService } from 'src/app/Services/PromotionService/Promotion.service';
import { LoadingScreenComponent } from 'src/app/UiTools/Loading/LoadingScreen/LoadingScreen.component';

@Component({
  selector: 'app-TrangUuDai',
  templateUrl: './TrangUuDai.component.html',
  styleUrls: ['./TrangUuDai.component.css']
})
export class TrangUuDaiComponent extends ComponentBase implements OnInit,AfterViewInit  {
    @ViewChild('loading') loading!: LoadingScreenComponent;
    public listPromotions: Promotion[] = [];

    constructor(
      private promotionService: PromotionService,
      private cdr: ChangeDetectorRef,
      private router: Router
    ) {
      super();
    }
  ngAfterViewInit(): void
  {
    this.loading.SetLoading(true);
    this.promotionService.GetPromotions()
    .pipe(finalize(() => {this.loading.SetLoading(false);}))
    .subscribe(x => {
        this.listPromotions = x;
    });
    this.cdr.detectChanges();
  }

    ngOnInit() {

    }

  onRedeem(){

  }
  navigateToYourComponent(id: string) {
    this.router.navigate(['/ChiTietUuDai', id]);
  }
}
