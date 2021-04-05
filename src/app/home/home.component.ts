import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  username;
  products:any;
  
  constructor(private as:AdminService,private router:Router,private us:UserService) { }

  ngOnInit(): void {
   
    this.username=localStorage.getItem("username")
    this.getAllProducts();
   
  }
    getAllProducts(){
    this.as.getProducts().subscribe(
      res=>{
        this.products=res["message"]
      },
      err=>{
        alert("Something went wrong in getting all products")
        console.log(err)
      }
    )
  }
  additem(n:number){
    if(this.username!==null){
      let obj={
      username:this.username,
      brand:this.products[n].brand,
      productname:this.products[n].productname,
      productID:this.products[n].productID,
      colour:this.products[n].colour,
      mfddate:this.products[n].mfddate,
      cost:this.products[n].cost,
      description:this.products[n].description,
      productImgLink:this.products[n].productImgLink
      }
      
      console.log("this new obj is ",obj)
      this.us.usercart(obj).subscribe(
        res=>{
          if(res["message"]){
            alert("Product added to cart")
          this.router.navigateByUrl("/usercart")
          }
        },
        err=>{
          alert("Something went wrong in Adding Course")
        console.log(err)
        }
      )
      
    }
    else{
      this.router.navigateByUrl("/login")
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home")
    window.location.reload();
  }
}
