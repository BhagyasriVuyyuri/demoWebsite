import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RouteGuard } from './route.guard';
import { UsercartComponent } from './usercart/usercart.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"resetpassword",component:ResetpasswordComponent},
  {path:"home",component:HomeComponent},
  {path:"viewproduct",component:ViewproductComponent},
  {path:"usercart",component:UsercartComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},
  
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[RouteGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
