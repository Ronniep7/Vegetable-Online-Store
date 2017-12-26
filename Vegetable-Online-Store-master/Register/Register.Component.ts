import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../User/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { DbService } from "../DbService/Db.service.component";
import { AuthService } from "../Auth/Auth.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'register',
  templateUrl: `./Register.component.html`,
  providers: [AngularFireAuth, DbService],
  styles:[`input.ng-invalid{border-left:5px solid red;}
  input.ng-valid{border-left:5px solid green;}`]
})
export class RegisterComponent 
{
  Ctrl = "Users";
  ErrMsg = "";

  date = new Date().toLocaleTimeString();


  constructor(private  Log : AppComponent ,  private AuthFire: AngularFireAuth, private Service: DbService, public AuthService: AuthService)
   {    
  }


  //Register
  Customer = new Customer("", "", "", "", "", "", "");
  City : string ;
  StreetNumber : number;
  Street : string;

  CheckPassWord(pass: string) {
    if (pass.length < 6) {
      this.ErrMsg = "Password Is Too Short";
      return false;
    } else if (pass.search(/[a-zA-Z]/) == -1) {
      this.ErrMsg = "Password Must Contain Letters";
      return false;
    } else if (pass.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
      this.ErrMsg = "bad_char - code Validation";
      return false;
    } if (this.Customer.CPassword != this.Customer.Password) {
      this.ErrMsg = "Your Password didnt Match the confirmation Password";
      return false;
    }
    return true;
  }


  //Register
  AddCustomer() {
    console.log(123456);
    if (this.CheckPassWord(this.Customer.Password)) {

      this.Customer.Address = this.StreetNumber + " " + this.Street + ", " + this.City;
      const req = this.Service.post("Customer", this.Customer);
      req.map(res => <any[]>res.json()).
        subscribe(response => {
          this.Register();
          console.log(response);         
        }, (err: any) => {
          console.log("Problem Definnition :")
          console.log( err);
            let error =  err.json();     
          this.ErrMsg = error;      
        });
    }
  }


  async Register() {
    try {     
      const result = await this.AuthFire.auth.createUserWithEmailAndPassword(this.Customer.Email, this.Customer.Password);
      this.ErrMsg = 'Registration Succeded';
      this.Log.LogOut();    
      console.log(result);
    } catch (e) {
      console.log(e);
      this.ErrMsg = e.message + " - fire ";
    }
  }
}




