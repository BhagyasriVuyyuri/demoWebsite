import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }


  status=false;
  
  ngOnInit(): void {
  }
  back(){
    this.router.navigateByUrl("/login")
  }
   onSubmit(formRef){
     let username=localStorage.getItem("username")
     let obj=formRef.value;
     if(obj.password==obj.conpassword){
       this.us.changePassword(obj).subscribe(
         res=>{
           if(res["message"]=="success"){
             alert("password changed")
             this.router.navigateByUrl("/login")
           }
           if(res["message"]=="invalid"){
             alert("invalid user")
           }
         },
         err=>{
           alert("something wrong in password reset")
           console.log(err)
         }
       )
     }
     else{
       this.status=true;
     }
   }


}
