import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms' ;
import { DbService } from "../DbService/Db.service.component";
import { AngularFireAuth } from "angularfire2/auth";
import {Customer} from '../User/User';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from "../Auth/Auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'user',
  templateUrl: `./HomeUser.component.html`,
  providers : [DbService , AngularFireAuth]
})
export class HomeUserComponent  {
  Products:any[];

  constructor(private Service : DbService ,private router : Router  , private Af : AngularFireAuth  , public AuthService : AuthService)
  {
    this.GetUserDetailes();
    this.GetProducts();
    
  }
  CustomerDetailes:Customer;
  
Appear = false;


PassToOrder(id : number){
  console.log(id);
  localStorage.setItem('P_Id',id.toString());
  this.router.navigate(['/Orders']);
  }

  GetUserDetailes(){
      const req = this.Service.Get('Customer');
      req.map(res => <any>res.json()).
      subscribe(res =>{
       this.CustomerDetailes= res;
       
       
      }, 
      (err : any) => {
      console.log("error : " + err);
      });
    }

    GetProducts()
    {
     const req = this.Service.Get('Products');
     req.map(res => <any[]>res.json()).
       subscribe(res => {
         this.Products = res;
       },
       (err: any) => {
         console.log("error : " + err);
       });
   }

 }