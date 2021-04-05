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
    this.place();
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  place(){
    this.us.getOrders(this.username).subscribe(
      res=>{
        this.order=res["message"]
      },
      err=>{
        alert("Something went wrong in place order")
        console.log(err)
      }
    )
  }
   
}