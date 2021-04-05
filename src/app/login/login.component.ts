import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private as:AdminService,private router:Router,private us:UserService) { }

  ngOnInit(): void {
  }
  reset(){
    this.router.navigateByUrl("/resetpassword")
  }
  register(){
    this.router.navigateByUrl("/register")
  }
  onSubmit(formRef){

    let userCredObj=formRef.value;
    if(userCredObj.usertype=="user"){
      this.us.loginUser(userCredObj).subscribe(
        res=>{
          if(res["message"]=="success"){
              localStorage.setItem("username",res["username"])

            //navigate to user component
            this.router.navigateByUrl("/home")
          }
          else{
            alert(res["message"])
            
          }
        },
        err=>{
          alert("Something went wrong in user login")
          console.log(err)
        }
      )

    }

      
       if(userCredObj.usertype=="admin"){
        this.as.adminLogin(userCredObj).subscribe(
          res=>{
            if(res["message"]=="success"){
            localStorage.setItem("adminname",res["username"])
            this.router.navigateByUrl("/admincomp")
            }
            else{
              alert(res["message"])
              
            }
          },
          err=>{
            alert("Error occurred")
            console.log(err)
          }
        )
      }
  }
}
