import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms' ;
import { DbService } from "../DbService/Db.service.component";
import { AngularFireAuth } from "angularfire2/auth";
import {Customer} from '../User/User';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from "../Auth/Auth.service";
import { comment } from './Comment';


@Component({
  selector: 'contact',
  templateUrl: `./Contact.Component.html`,
  providers : [DbService],
  styleUrls : ['Contact.Component.css']
})
export class ContactComponent  {

    constructor(private Service : DbService){}

    _comment  = new comment("","","");
    PostComment()
    {     

      const req = this.Service.post('Comments', this._comment);
      req.map(res => <any>res.json()).
      subscribe(res =>{
        console.log(res);
      }, 
      (err : any) => {
      console.log("error : " + err);
      });
    }


 }