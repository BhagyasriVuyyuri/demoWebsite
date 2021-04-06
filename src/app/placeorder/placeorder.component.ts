import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements OnInit {
  username;
  order:any;

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getCart();
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }

  getCart(){
    this.us.getOrderItems(this.username).subscribe(
      res=>{
        this.order=res["message"]
      },
      err=>{
        alert("Something went wrong in Adding Course")
        console.log(err)
      }
    )
  }
  
  delete(n:number){
    let obj=this.order[n];
    console.log("the deleted obj is ",obj)

    this.us.deleteOrderProduct(obj).subscribe(
      res=>{
        if(res["message"]){
          alert("Product removed")
          this.router.navigateByUrl("/placeorder").then(()=>{
            window.location.reload();
          });
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }
    )

  }
   
}