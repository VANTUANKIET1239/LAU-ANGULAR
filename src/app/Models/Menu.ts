export class Menu {
  menu_Id: string;
  menuName: string;
  menuImage: string;
  price: number;
  hotDeal: boolean;
  bestSaller: boolean;
  menuCategoryId: string;
  menuCategoryName: string;
  state: boolean;

  constructor(
    menu_Id: string,
    menuName: string,
    menuImage: string,
    price: number,
    hotDeal: boolean,
    bestSaller: boolean,
    state: boolean,
    MenuCategoryId?: string,
    MenuCategoryName?: string,

  ) {
    this.menu_Id = menu_Id;
    this.menuName = menuName;
    this.menuImage = menuImage;
    this.price = price;
    this.hotDeal = hotDeal;
    this.bestSaller = bestSaller;
    this.menuCategoryId = MenuCategoryId ?? '';
    this.menuCategoryName = MenuCategoryName ?? '';
    this.state = state;
  }
}
