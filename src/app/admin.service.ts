import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private hc:HttpClient) { }

      adminLogin(adminObj):Observable<any>{
        return this.hc.post("/admin/login",adminObj)
      }
    
      createProduct(product:any):Observable<any>{

        return this.hc.post("/admin/addproduct",product);
      }
      getProducts():Observable<any>{
        return this.hc.get("/admin/allproducts");
      }
     
      deleteProduct(obj):Observable<any>{
      
        return this.hc.post("/admin/delete",obj);
      }
      getItem(obj):Observable<any>{
      
        return this.hc.get("/admin/oneproduct/"+obj);
      }
}
