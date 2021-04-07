import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  c;
  category;
  cat=false;
  username;
  products=[];
  searchTerm;
  search;
  userCartSize;
  cartsize;
  successmessage;
  errormessage;
  constructor(private as:AdminService,private us:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
   
    this.username=localStorage.getItem("username")
    
    this.getAllProducts();
    this.cartStatus();
   
  }
  login(){
    this.router.navigateByUrl("/login")
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
  goto(n){
    this.cat=true;
    if(n==0){
      this.category="ac";
    }
    else if(n==1){
      this.category="tv";
    }
    else if(n==2){
      this.category="washing machine";
    }
    else if(n==3){
      this.category="shoes";
    }
    else if(n==4){
      this.category="watch";
    }
    if(n==5){
      this.category="refrigerator";
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home")
    window.location.reload();
  }
  viewitem(p){
    
    
         
          localStorage.setItem("productname",p["productname"])
          this.router.navigateByUrl("/viewproduct");
        }
        showUserCart(){
     
          this.router.navigateByUrl('/usercart')
          }
        
        cartStatus(){
          this.us.getCartSize(this.username).subscribe(
            res=>{
              this.userCartSize=res["cartsize"];
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
            productname:this.products[n].productname,
            productID:this.products[n].productID,
            brand:this.products[n].brand,
            mfddate:this.products[n].mfddate,
            cost:this.products[n].cost,
            colour:this.products[n].colour,
            category:this.products[n].category,
            rating:this.products[n].rating,
            quantity:this.products[n].quantity,
            description:this.products[n].description,
            productImgLink:this.products[n].productImgLink
            }
            
            
            this.us.usercart(obj).subscribe(
              res=>{
                if(res["message"]=="success"){
                  this.successmessage="Product added to cart";
                  this.toastr.success(this.successmessage)
                  
                  // window.location.reload();
                 this.router.navigateByUrl("/usercart")
                }
               
                if(res["message"]=="Item already added"){
                 this.errormessage="Item already added..."
                 this.toastr.error(this.errormessage)
               }
               
              },
             
              err=>{
                alert("Something went wrong in Adding product")
              console.log(err)
              }
            )
            
          }
          else{
            this.router.navigateByUrl("/login")
          }
        }
  

}
