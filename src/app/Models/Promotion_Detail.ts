export class PromotionDetail {
  public promotionDetail_Id: string;
  public content: string;

  constructor(promotionDetail_Id?: string, content?: string) {
      this.promotionDetail_Id = promotionDetail_Id ?? "";
      this.content = content ?? "";
  }
  set ExpirationDate(value: string) {
    this.promotionDetail_Id = value;
  }
  set PromotionDetails(value: string) {
    this.content = value;
  }
}
