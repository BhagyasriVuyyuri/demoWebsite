import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchTerm: string): any[] {
    if(!searchTerm){
      
      return products;
    }
    
    else{
    
       let productname=products.filter(obj=>obj.productname.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
       let brand=products.filter(obj=>obj.brand.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
       if(productname.length!==0){
         return productname;
       }
       else{
         return brand;
       }
    }
  }

}
