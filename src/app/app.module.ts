import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './User_Interface/header/header.component';
import { FooterComponent } from './User_Interface/footer/footer.component';
import { DropdownUserComponent } from './User_Interface/dropdown-user/dropdown-user.component';
import { CarouselSliderComponent } from './User_Interface/TrangChu/Carousel-Slider.component';
import { TrangThucDonComponent } from './User_Interface/TrangThucDon/TrangThucDon.component';
import { DoiMauChuDirective } from './Directives/doi-mau-chu.directive';
import { MenuCategoryNavComponent } from './User_Interface/TrangThucDon/MenuCategoryNav/MenuCategoryNav.component';
import { ListMenuComponent } from './User_Interface/TrangThucDon/ListMenu/ListMenu.component';
import { TrangDangNhapComponent } from './User_Interface/TrangDangNhap/TrangDangNhap.component';
import { DangKyComponent } from './User_Interface/DangKy/DangKy.component';
import { TrangUuDaiComponent } from './User_Interface/TrangUuDai/TrangUuDai.component';
import { TrangChiTietUuDaiComponent } from './User_Interface/TrangChiTietUuDai/TrangChiTietUuDai.component';
import { CuaHangPopUpComponent } from './User_Interface/TrangChiTietUuDai/CuaHangPopUp/CuaHangPopUp.component';
import { DoiUuDaiPopUpComponent } from './User_Interface/TrangChiTietUuDai/DoiUuDaiPopUp/DoiUuDaiPopUp.component';
import { TrangTinTucComponent } from './User_Interface/TinTuc/TrangTinTuc/TrangTinTuc.component';
import { ChiTietTinTucComponent } from './User_Interface/TinTuc/ChiTietTinTuc/ChiTietTinTuc.component';
import { TrangGioHangComponent } from './User_Interface/TrangGioHang/TrangGioHang.component';
import { DatMonComponent } from './User_Interface/DatMon/DatMon.component';
import { DoiMauBtnDirective } from './Directives/DoiMauBtn.directive';
import { CuonTrangDirective } from './Directives/CuonDenIdCate/CuonTrang.directive';
import { GiaoDienCaNhanComponent } from './User_Interface/GiaoDienCaNhan/GiaoDienCaNhan.component';
import { ThongTinCaNhanComponent } from './User_Interface/GiaoDienCaNhan/ThongTinCaNhan/ThongTinCaNhan.component';
import { UuDaiCuaToiComponent } from './User_Interface/GiaoDienCaNhan/UuDaiCuaToi/UuDaiCuaToi.component';
import { SoDiaChiComponent } from './User_Interface/GiaoDienCaNhan/SoDiaChi/SoDiaChi.component';
import { LichSuDatBanComponent } from './User_Interface/GiaoDienCaNhan/LichSuDatBan/LichSuDatBan.component';
import { LichSuGiaoHangComponent } from './User_Interface/GiaoDienCaNhan/LichSuGiaoHang/LichSuGiaoHang.component';
import { ChiTietLSDatHangComponent } from './User_Interface/GiaoDienCaNhan/ChiTietLSDatHang/ChiTietLSDatHang.component';
import { ThemDiaChiPopUpComponent } from './User_Interface/GiaoDienCaNhan/SoDiaChi/ThemDiaChiPopUp/ThemDiaChiPopUp.component';
import { TrangDatBanComponent } from './User_Interface/TrangDatBan/TrangDatBan.component';
import { ChiTietDatBanComponent } from './User_Interface/ChiTietDatBan/ChiTietDatBan.component';
import { XacNhanPopUpComponent } from './User_Interface/ChiTietDatBan/XacNhanPopUp/XacNhanPopUp.component';
import { TrangThanhToanComponent } from './User_Interface/TrangThanhToan/TrangThanhToan.component';
import { TrangDoiMatKhauComponent } from './User_Interface/TrangDoiMatKhau/TrangDoiMatKhau.component';
import { HomeAdminComponent } from './Admin_Interface/home-admin/home-admin.component';
import { CRUDMenuComponent } from './Admin_Interface/CRUDMenu/CRUDMenu.component';
import { CRUDMenuCategoryComponent } from './Admin_Interface/CRUDMenuCategory/CRUDMenuCategory.component';
import { CRUDNewsComponent } from './Admin_Interface/CRUDNews/CRUDNews.component';
import { ThemThucDonPopUpComponent } from './Admin_Interface/CRUDMenu/ThemThucDonPopUp/ThemThucDonPopUp.component';
import { SuaThucDonPopUpComponent } from './Admin_Interface/CRUDMenu/SuaThucDonPopUp/SuaThucDonPopUp.component';
import { MenuService } from './Services/MenuService/Menu.service';
import { MenuCategoryService } from './Services/MenuCategoryService/MenuCategory.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './Admin_Interface/Pagination/Pagination.component';
import { VNDCurrencyPipe } from './Pipes/VNDCurrency.pipe';
import { XacNhanXoaPopUpComponent } from './UiTools/XacNhanXoaPopUp/XacNhanXoaPopUp.component';
import { SuaDanhMucThucDonComponent } from './Admin_Interface/CRUDMenuCategory/SuaDanhMucThucDon/SuaDanhMucThucDon.component';
import { ThemDanhMucThucDonComponent } from './Admin_Interface/CRUDMenuCategory/ThemDanhMucThucDon/ThemDanhMucThucDon.component';
//import { SelectCustomComponent } from './UiTools/select-custom/select-custom.component';
import { JwtModule } from "@auth0/angular-jwt";
import { UserAuthService } from './Services/UserAuth/UserAuth.service';
import { DatePipe } from '@angular/common';
import { LoadingScreenComponent } from './UiTools/Loading/LoadingScreen/LoadingScreen.component';
import { TransformTextPipe } from './Pipes/TransformText/TransformText.pipe';
import { AddressService } from './Services/AddressService/Address.service';
import { CityService } from './Services/CityService/City.service';
import { WardService } from './Services/WardService/Ward.service';
import { DistrictService } from './Services/DistrictService/District.service';
import { CRUDPromotionComponent } from './Admin_Interface/CRUD_Promotion/CRUDPromotion/CRUDPromotion.component';
import { EditPromotionComponent } from './Admin_Interface/CRUD_Promotion/Edit-Promotion/Edit-Promotion/Edit-Promotion.component';
import { PromotionService } from './Services/PromotionService/Promotion.service';
import { ImagePopupComponent } from './UiTools/ImagePopup/ImagePopup/ImagePopup.component';
import { CRUDBranchComponent } from './Admin_Interface/CRUD_Branch/CRUDBranch/CRUDBranch.component';
import { EditBranchComponent } from './Admin_Interface/CRUD_Branch/Edit-Branch/Edit-Branch/Edit-Branch.component';
import { BranchService } from './Services/BranchService/Branch.service';
import { AddToBranchComponent } from './Admin_Interface/CRUD_Promotion/AddToBranchPopup/AddToBranch/AddToBranch.component';



export function tokenGetter() {
  return localStorage.getItem("jwt");
}



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DropdownUserComponent,
    CarouselSliderComponent,
    TrangThucDonComponent,
    DoiMauChuDirective,
    MenuCategoryNavComponent,
    ListMenuComponent,
    TrangDangNhapComponent,
    DangKyComponent,
    TrangUuDaiComponent,
    TrangChiTietUuDaiComponent,
    CuaHangPopUpComponent,
    DoiUuDaiPopUpComponent,
    TrangTinTucComponent,
    ChiTietTinTucComponent,
    TrangGioHangComponent,
    DatMonComponent,
    DoiMauBtnDirective,
    CuonTrangDirective,
    GiaoDienCaNhanComponent,
    ThongTinCaNhanComponent,
    UuDaiCuaToiComponent,
    SoDiaChiComponent,
    LichSuDatBanComponent,
    LichSuGiaoHangComponent,
    ChiTietLSDatHangComponent,
    ThemDiaChiPopUpComponent,
    TrangDatBanComponent,
    ChiTietDatBanComponent,
    XacNhanPopUpComponent,
    TrangThanhToanComponent,
    TrangDoiMatKhauComponent,
    HomeAdminComponent,
    CRUDMenuComponent,
    CRUDMenuCategoryComponent,
    CRUDNewsComponent,
    ThemThucDonPopUpComponent,
    SuaThucDonPopUpComponent,
    PaginationComponent,
    VNDCurrencyPipe,
    XacNhanXoaPopUpComponent,
     SuaDanhMucThucDonComponent,
     ThemDanhMucThucDonComponent,
      LoadingScreenComponent,
      TransformTextPipe,
      CRUDPromotionComponent,
      EditPromotionComponent,
      ImagePopupComponent,
      CRUDBranchComponent,
      EditBranchComponent,
      AddToBranchComponent
    // SelectCustomComponent

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7204"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    MenuService,
    MenuCategoryService,
    UserAuthService,
    DatePipe,
    AddressService,
    CityService,
    WardService,
    DistrictService,
    PromotionService,
    DatePipe,
    BranchService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
