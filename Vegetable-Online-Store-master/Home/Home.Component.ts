import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms' ;
import { DbService } from "../DbService/Db.service.component";
import { AngularFireAuth } from "angularfire2/auth";
import {Customer} from '../User/User';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from "../Auth/Auth.service";


@Component({
  selector: 'home',
  templateUrl: `./Home-component.html`,
  providers : [DbService , AngularFireAuth]
})
export class HomeComponent  { 
constructor(private Service : DbService  , private Af : AngularFireAuth  , public AuthService : AuthService)
{
  this.GetProducts();
}

CustomerDetailes:Customer;
Products : any []; 

GetProducts(){
    const req = this.Service.Get('Products');
    req.map(res => <any []>res.json()).
    subscribe(res =>{
    this.Products = res;
    this.GetUserDetailes();
    }, 
    (err : any) => {
    console.log("error : " + err);
    });
}

GetUserDetailes(){
  debugger;
  console.log(this.Af.auth.currentUser.email);
    const req = this.Service.Get1('Users',this.Af.auth.currentUser.email);
    req.map(res => <any>res.json()).
    subscribe(res =>{
     this.CustomerDetailes= res;
     
    }, 
    (err : any) => {
    console.log("error : " + err);
    });
  }

 }
