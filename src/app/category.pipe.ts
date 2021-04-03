import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  
  transform(products: any[], category: string): any[] {
    if(!category){
      
      return products;
    }
    
    else {
      return products.filter(obj=>obj.category.toLowerCase().indexOf(category.toLowerCase())!==-1);
    }
  }

}
