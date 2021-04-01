import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private as:AdminService,private router:Router,private us:UserService) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
       username:new FormControl(null,Validators.required),
       password:new FormControl(null,Validators.required)
    })
  }
  reset(){
    this.router.navigateByUrl("/resetpassword")
  }
  register(){
    this.router.navigateByUrl("/register")
  }
  onSubmit(){

    let userCredObj=this.loginForm.value;
   
      this.us.loginUser(userCredObj).subscribe(
        res=>{
          if(res["message"]=="success"){
            localStorage.setItem("token",res["signedToken"])
              localStorage.setItem("username",res["username"])
              if(res.username=="Admin"){
                this.router.navigateByUrl("/admincomp")
              }
            //navigate to user component
            else{
              this.router.navigateByUrl("/home")
            }
          }
          else{
            alert(res["message"])
            console.log("error is",res["reason"]);
            
            
          }
        },
        err=>{
          alert("Something went wrong in user login")
          console.log(err)
        }
      )

      }

}
