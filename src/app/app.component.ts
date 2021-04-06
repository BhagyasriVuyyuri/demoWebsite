import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  userCartSize;
  title = 'FLIPKART';
  username;

constructor(private us:UserService,private router:Router) { }

ngOnInit(): void {
  this.username=localStorage.getItem("username")
  //this.getCart();
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
}
