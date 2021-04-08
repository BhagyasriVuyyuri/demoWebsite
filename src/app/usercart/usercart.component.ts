import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'
import { UserService } from '../user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {
  username;
  cart:any;
  amount:any;
  //length:any;

  constructor(private toastr:ToastrService,private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getCart();
    this.totalamount();
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  getCart(){
    this.us.getCartItems(this.username).subscribe(
      res=>{
        this.cart=res["message"]
        this.totalamount()
      },
      err=>{
        this.toastr.warning('Something went wrong in Adding Course');
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
          this.toastr.success('Product removed');
          this.router.navigateByUrl("/usercart").then(()=>{
            window.location.reload();
          });
        }
      },
      err=>{
        this.toastr.warning("Something went wrong in user creation");
        console.log(err);
      }
    )

  }
 
  placeorder(n:number){
    if(this.username!==null){
      let obj={
        username:this.username,
        productname:this.cart[n].productname,

      colour:this.cart[n].colour,
    
      cost:this.cart[n].cost,
    
      productImgLink:this.cart[n].productImgLink,

      quantity: this.cart[n].quantity

      }
    console.log("the order placed is ",obj)

    this.us.placeOrder(obj).subscribe(
      res=>{
        if(res["message"]=="product exist"){

          this.toastr.warning('product is already added to placeOrder');
        }
        else{
          this.toastr.success("order placed successfully");
          this.router.navigateByUrl("/placeorder").then(()=>{
            window.location.reload();
          
          });
        }
      },
      err=>{
        this.toastr.warning("Something went wrong in place order");
        console.log(err);
      }
    )
  this.us.deleteOrder1(obj).subscribe(
    res=>{
      if(res["message"]){
        this.toastr.success('Product deleted in usercart');
      }
    },
    err=>{
      this.toastr.warning('Something went wrong in order deletion');
      console.log(err);
    }
  )
  }
  else{
    this.router.navigateByUrl("/login")
  }
}

incr(p:any){
  if(p.quantity){
    let cost=p.cost/p.quantity;
  p.quantity+=1;

  p.cost=p.quantity*cost;
  this.totalamount();
  }

}
decr(p:any){
  if(p.quantity!=1){
    let cost=p.cost/p.quantity;
    p.quantity-=1;
    
    p.cost=p.quantity*cost;
    this.totalamount();
    }

}
totalamount(){
  this.amount=0;
      for(let i=0;i<this.cart.length;i++){
        let cost=this.cart[i].cost/this.cart[i].quantity;
        this.amount+=cost*this.cart[i].quantity
     
      }

}
}