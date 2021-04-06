import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  username;
  cart=[];
  
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getCart();
    
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  

  back(){
    this.router.navigateByUrl("/home")
  }
  getCart(){
    this.us.getCartItems(this.username).subscribe(
      res=>{
        this.cart=res["message"]
        console.log("the cart items",this.cart)
        

      },
      err=>{
        alert("Something went wrong in Adding Product")
        console.log(err)
      }
    )
  }


  delete(n:number){
    let obj=this.cart[n];
    console.log("the deleted obj is ",obj)

    this.us.deleteCartProduct(obj).subscribe(
      res=>{
        if(res["message"]){
          alert("Product removed from Cart")
          window.location.reload();
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }
    )

  }
  
  


}
