import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { DbService } from "../DbService/Db.service.component";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  Role : boolean = false ;



  

  constructor(private firebaseAuth: AngularFireAuth , public DataBase :  DbService  ) {
   
    this.user = firebaseAuth.authState;
    this.RoleCheck();

  }



RoleCheck() 
{
  
    const req = this.DataBase.GetUserState('Customer');
    req.map(res => <any >res.json()).
    subscribe(res =>{
      console.log("Is Manager Loged ? ");      
      console.log(res);
      this.Role =  res;
    }, 
    (err : any) => {
      console.log("Error  !");
      console.log(err.json());  
      this.Role =  err.json();
    });
    }


}