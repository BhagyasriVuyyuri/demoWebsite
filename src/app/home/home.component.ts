import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  username;
  products=[];
  searchTerm;
  search
  constructor(private as:AdminService,private router:Router) { }

  ngOnInit(): void {
   
    this.username=localStorage.getItem("username")
    this.getAllProducts();
   
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
 

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home")
    window.location.reload();
  }

}
