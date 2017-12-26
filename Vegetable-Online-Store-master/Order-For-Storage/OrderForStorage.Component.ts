import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms' ;
import { DbService } from "../DbService/Db.service.component";
import { AngularFireAuth } from "angularfire2/auth";
import {Customer} from '../User/User';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from "../Auth/Auth.service";


@Component({
  selector: 'OrderForStorage',
  templateUrl: `./OrderForStorage-component.html`,
providers : [DbService , AngularFireAuth]
})
export class OrderForStorageComponent  { 

constructor(private Service : DbService  , private Af : AngularFireAuth , 
public AuthService : AuthService)
{
}



 }
