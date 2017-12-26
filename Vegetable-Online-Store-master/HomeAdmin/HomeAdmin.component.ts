
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
  selector: 'admin',
  templateUrl: `./HomeAdmin.component.html`,
  providers : [DbService , AngularFireAuth]
})
export class HomeAdminComponent
  { 
  constructor(private Service: DbService, private AuthFire: AngularFireAuth, private router: Router) {
    this.GetStorage();
    this.GetAllOrders();   
    this.GetBudjet();
  }

Appear = 1;
  Storage : any [];
  TodayOrders : any [];
  AllOrders:any [];

  Shortage : number;
  
  PassToOrder(id : number){
    console.log(id);
    debugger;
    localStorage.setItem('P_Id',id.toString());
    this.router.navigate(['/Orders']);
    }

  GetStorage(){
    const req = this.Service.Get('Storage');
    req.map(res => <any []>res.json()).
    subscribe(res =>{
    this.Storage = res;
    this.Shortage =  this.Storage.filter(item => item.Amount <= 300).length;


    console.log(this.Storage);  
    }, 
    (err : any) => {
    console.log("error : " + err);
    });
}

Stat: any;

GetBudjet() {
  console.log("Get The Budjet :");
  const req = this.Service.Get('Managment');
  req.map(res => <any>res.json()).
    subscribe(res => {
      console.log(res);
      this.Stat = res;
    },
    (err: any) => {
      console.log("error : " + err);

    });
}


GetAllOrders() {
  const req = this.Service.Get('Orders');
  req.map(res => <any[]>res.json()).
    subscribe(res => {
      this.AllOrders = res;

      let date;
       date = new Date();

       console.log(new Date().getUTCFullYear()+"-"+(new Date().getUTCMonth()+1)+'-0'+new Date().getDate());
       
      let Today = new Date().getUTCFullYear()+"-"+(new Date().getUTCMonth()+1)+'-0'+new Date().getDate();

      this.TodayOrders = this.AllOrders.filter(Order =>(Order.OrderDate.toString().includes(Today)));

     console.log(this.TodayOrders);

      ;},
    (err: any) => {
      console.log("error : " + err);
    });
}

}