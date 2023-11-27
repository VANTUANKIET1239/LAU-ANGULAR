import { PromotionDetail } from "./Promotion_Detail";

export class Promotion {
  public promotion_Id: string;
  public promotionImage: string | Uint8Array;
  public promotionName: string;
  public validityPeriod: string;
  public expirationDate: Date;
  public createDate: Date;
  public state: boolean;
  public imagePath: string;
  public promotionDetails: PromotionDetail[]

    constructor(
      promotion_Id?: string,
      promotionImage?: string|Uint8Array,
      promotionName?: string,
      validityPeriod?: string,
      expirationDate?: Date,
      createDate?: Date,
      promotionDetails?: PromotionDetail[],
      state?: boolean,
      imagePath?:string
  ) {
      this.promotion_Id = promotion_Id ?? "";
      this.promotionImage = promotionImage ?? "";
      this.promotionName = promotionName ?? "";
      this.validityPeriod = validityPeriod ?? "";
      this.expirationDate = expirationDate ?? new Date();
      this.createDate = createDate ?? new Date();
      this.promotionDetails = promotionDetails ?? [];
      this.state = state ?? true;
      this.imagePath = imagePath ?? "";
  }
    set Promotion_Id(value: string) {
      this.promotion_Id = value;
  }
  set PromotionName(value: string) {
    this.promotionName = value;
  }
  set ExpirationDate(value: Date) {
    this.expirationDate = value;
  }
  set PromotionDetails(value: PromotionDetail[]) {
    this.promotionDetails = value;
  }
  set ImagePath(value: string) {
    this.imagePath = value;
  }


}
