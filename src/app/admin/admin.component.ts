import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  file:File; 
  username:any;
  incomingfile(event:any) {
    this.file= event.target.files[0]; 
  }
  adminname;
  //inject user service
  constructor(private as:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.username;
    this.adminname=localStorage.getItem("adminname")
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  onSubmit(ref:any){   
    let productObj = ref.value;
    console.log(productObj);
    let formData = new FormData();

    //adding image and other data to FormData object
    formData.append('photo',this.file,this.file.name);
    formData.append("productObj",JSON.stringify(productObj)) 

    this.as.createProduct(formData).subscribe(
      res=>{
        if(res["message"] == "product added"){
          alert("Product Added Successfully")
          this.router.navigateByUrl("/allproducts");
        } 
        if(res["message"] == "product existed"){
          alert("ProductID is already existed..choose another");
        }
      },
      err=>{
        alert("Something went wrong in adding product");
        console.log(err);
      }  
    )
    
  }

 
}