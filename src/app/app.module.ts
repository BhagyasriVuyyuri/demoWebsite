import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AdminModule } from './admin/admin.module';
//import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { HomeComponent } from './home/home.component';
import { UsercartComponent } from './usercart/usercart.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import {ToastrModule}from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchPipe } from './search.pipe';



@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
    RegisterComponent,
    //ResetpasswordComponent,
    HomeComponent,
    UsercartComponent,
    PlaceorderComponent,
    ResetpasswordComponent,
    SearchPipe,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:5000,
      positionClass:'toast-top-center',
      closeButton:true
    }),
    BrowserAnimationsModule,
    //AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
