import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }
      createUser(userObj):Observable<any>{
        return this.hc.post("/user/register",userObj)
      }
      loginUser(userCredObj):Observable<any>{
      return this.hc.post("/user/login",userCredObj)
    }
    getUser(username):Observable<any>{
      return this.hc.get("/user/getuser/"+username)
    }
    changePassword(obj){
      return this.hc.post("/user/resetpassword",obj)
    }
    usercart(obj):Observable<any>{
      return this.hc.post("/user/addtocart",obj);
    }
    getCartItems(username):Observable<any>{
      console.log("the username is ",username)
      return this.hc.get("/user/getcartitems/"+username);
    }
    deleteCartProduct(obj):Observable<any>{
      return this.hc.post("/user/deleteproduct",obj);
    }
    getCartSize(username:any):Observable<any>{
      console.log("the us is ",username);
      return this.hc.get("/user/getsize/"+username);
    }
    getOrderItems(username):Observable<any>{
      console.log("the username is ",username)
      return this.hc.get("/user/getOrderitems/"+username);
    }
    deleteOrderProduct(obj):Observable<any>{
      return this.hc.post("/user/deleteOrder",obj);
    }
    placeOrder(obj):Observable<any>{
      return this.hc.post("/user/placeOrder",obj);
    }
    
}