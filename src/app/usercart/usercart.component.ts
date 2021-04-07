import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  username;
  cart=[];
  amount;
  constructor(private us:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getCart();
    this.totalamount(); 
  }
  incr(p:any){
    console.log("quantity is ",p.quantity)
    console.log("cost",p.cost)
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
        this.totalamount()

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
          this.toastr.warning('Product Removed from Cart');
          this.router.navigateByUrl("/usercart").then(() => {​​​​​
            window.location.reload();
          }​​​​​);
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }
    )

  }
 


}
