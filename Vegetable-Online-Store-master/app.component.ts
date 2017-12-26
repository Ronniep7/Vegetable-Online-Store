import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from "./Auth/Auth.service";
import { DbService } from "./DbService/Db.service.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFireAuth]
})
export class AppComponent {

  
    constructor(public Af: AngularFireAuth, public AuthService: AuthService, private Service: DbService) {

      console.log("========> " + AuthService.Role);
      
    }
  

    
    LogOut() {
      this.Af.auth.signOut().then(result => {
        console.log("Loged Out - clean Move");  
      }), (err: any) => {
        console.log("Error Still Loged in");
      };  
    }
  
    CleanCookie() {
      let SessionToServer = localStorage.getItem('Session');
      const Req = this.Service.LogOut("Customer", SessionToServer);
      Req.map(res => <any>res.json()).
        subscribe(res => {
          console.log("Finally !!!!!");
          localStorage.removeItem('Session');
          localStorage.removeItem('expires_at');  
          this.LogOut();
          console.log("Supposed to be loged out"); 
          this.AuthService.RoleCheck();
        },
        (err: any) => {
          console.log(" Error - in deleting Cokies  ");
        });
    }
  
  
  }
  