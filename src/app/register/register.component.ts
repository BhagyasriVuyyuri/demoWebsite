import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    this.router.navigateByUrl("/login")
  }
  onSubmit(ref:any){   
    let userObj = ref.value;
    console.log(userObj);
    
    this.us.createUser(userObj).subscribe(
      res=>{
        if(res["message"]=="user existed"){
          alert("Username is already existed..choose another");
        }
        if(res["message"]=="user created"){
          alert("Registration successful");

          //navigate to login component
          this.router.navigateByUrl("/login");
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }  
    )
    
}


}
