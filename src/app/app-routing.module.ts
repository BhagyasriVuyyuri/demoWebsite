import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UsercartComponent } from './usercart/usercart.component';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"resetpassword",component:ResetpasswordComponent},
  {path:"home",component:HomeComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"usercart",component:UsercartComponent},
  {path:"placeorder",component:PlaceorderComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
