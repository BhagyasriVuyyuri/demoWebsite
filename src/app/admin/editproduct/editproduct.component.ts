import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  productname;
z
    registerForm=new FormGroup({
    productID:new FormControl(''),
    productname:new FormControl(''),
    brand:new FormControl(''),
    category:new FormControl(''),
    colour:new FormControl(''),
    cost:new FormControl(''),
    description:new FormControl(''),
   
  })

  constructor(private as:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.productname=localStorage.getItem("productname");
    this.getproductdata();
 
    
  }
  getcontrol(){
    return this.registerForm.controls;
  }
  back(){
    this.router.navigateByUrl("/allproducts")
  }
  getproductdata(){
  this.as.getproductdata(this.productname).subscribe(
    res=>{
              
        console.log(res)
       this.registerForm=new FormGroup({
     
      productname:new FormControl(res.Details.productname),
      productID:new FormControl(res.Details.productID),
      brand:new FormControl(res.Details.brand),
      category:new FormControl(res.Details.category),
      colour:new FormControl(res.Details.colour),
      cost:new FormControl(res.Details.cost),
      description:new FormControl(res.Details.description) 
    })

  })
}
  onSubmit(){
    console.log(this.registerForm.value);
    let proObj=this.registerForm.value;
    this.as.editproduct(proObj).subscribe(
      res=>{
        if(res["message"]){
          alert("Product Details Updated")
          this.router.navigateByUrl("/allproducts")
        }
      },
      err=>{
        alert("Something went wrong")
        console.log(err)
      }
    )
   
  }


}
