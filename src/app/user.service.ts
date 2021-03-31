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
}
