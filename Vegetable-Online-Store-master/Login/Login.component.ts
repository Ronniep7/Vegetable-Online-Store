import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";
import { User} from '../User/User';
import { DbService } from "../DbService/Db.service.component";
import { AuthService } from "../Auth/Auth.service";
import {Router} from '@angular/router';



@Component({
    selector: 'login',
    templateUrl: `./Login-component.html`,
})
export class LoginComponent {
    ErrMsg = "";

    constructor(private AuthFire: AngularFireAuth, private Service: DbService , private AuthService: AuthService,private router : Router) { }

    User = new User("", "");


    async Login() {
        try {
            debugger;
            this.ErrMsg = "Login Successfuly";
            const result = await this.AuthFire.auth.signInWithEmailAndPassword(this.User.Email, this.User.Password);
            this.AuthService.RoleCheck();
            if(this.AuthService.Role)
            {
                this.router.navigate(['./HomeAdmin']); 
            }
            else{
                this.router.navigate(['./HomeUser']);                
            }
            
        } catch (e) {
            console.log(e);
            this.ErrMsg = e.message + " - fire";
            this.User.Email = this.User.Password = "";
        }
        console.log(this.AuthFire.auth.currentUser);
    }


    LoginCustomer() {     
            const req = this.Service.login("Customer",this.User);
            req.map(res => <any>res.json()).
            subscribe(res => {
                console.log(res.SessionId);
                this.Login();
                 localStorage.setItem('Session',res.SessionId );
                 const expiresAt = JSON.stringify(20000) + new Date().getTime();
                 localStorage.setItem('expires_at', expiresAt);
            },
            (err : any) => {
            console.log("error : " + err);

            this.ErrMsg = err;
            });
           
    }

}
