import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../User/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { DbService } from "../DbService/Db.service.component";
import { AuthService } from "../Auth/Auth.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'Stam',
  templateUrl: `./Stam-component.html`,
  providers: [AngularFireAuth, DbService]
})
export class StamComponent 
{}