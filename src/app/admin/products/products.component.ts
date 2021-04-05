import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products=[];
  constructor(private as:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
  
  getAllProducts(){
    this.as.getProducts().subscribe(
      res=>{
        this.products=res["message"]
      },
      err=>{
        alert("Something went wrong in getting products")
        console.log(err)
      }
    )
  }


  delete(n:number){
    let obj=this.products[n];
    console.log("the deleted obj is ",obj)

    this.as.deleteProduct(obj).subscribe(
      res=>{
        if(res["message"]){
          alert("Product removed from Website")
          window.location.reload();
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }
    )

  }
   back(){
     this.router.navigateByUrl("/admincomp")
   }
}