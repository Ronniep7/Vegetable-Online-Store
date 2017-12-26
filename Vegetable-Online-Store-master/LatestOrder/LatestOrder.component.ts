import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms' ;
import { DbService } from "../DbService/Db.service.component";
import { AngularFireAuth } from "angularfire2/auth";
import {Customer} from '../User/User';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from "../Auth/Auth.service";


@Component({
  selector: 'Latest-Order',
  templateUrl: `./LatestOrder.component.html`,
  providers : [AuthService,DbService]
})
export class LatestOrderComponent  {

  LatestOrders:any;
constructor(public AuthService : AuthService ,private Service:DbService,private af:AngularFireAuth)
{
  this.GetLatestOrders();
  this.GetAllOrders();

}

GetLatestOrders()
{
  const req = this.Service.Get1('Orders',this.af.auth.currentUser.email);
  req.map(res => <any []>res.json()).
  subscribe(res =>{
  this.LatestOrders = res;
  }, 
  (err : any) => {
  console.log("error : " + err);
  });
}


AllOrders:any [];
Counter = 0 ;
Adder = 5;


GetAllOrders() {
  const req = this.Service.Get('Orders');
  req.map(res => <any[]>res.json()).
    subscribe(res => {
      this.AllOrders = res;
      console.log(this.AllOrders);},
    (err: any) => {
      console.log("error : " + err);
    });
}

NavigateOrders(Choise : number)
{
  console.log((this.AllOrders.length/5)-1>Choise);
   if(this.AllOrders.length/5<Choise)
   {
    this.Adder = this.AllOrders.length % 5;   
   }else
   this.Adder =5;
   
  this.Counter = (Choise - 1)*5;

}


 }