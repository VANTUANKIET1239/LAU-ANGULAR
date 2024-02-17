import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'VNDCurrency'
})
export class VNDCurrencyPipe implements PipeTransform {

  transform(value: any,type?:boolean): string {
    if (isNaN(value)) {
      return '0 VND';
    }
    if(type){
      var formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value).replace(/₫/g, '');
    }
    // Format the number to VND currency format
   else{
      var formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
   }

    return formattedValue;
  }

}
