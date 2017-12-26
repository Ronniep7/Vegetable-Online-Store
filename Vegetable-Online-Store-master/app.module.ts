import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { FireConfig } from "./FireConfig/Fire.config";
import { LoginComponent } from "./Login/Login.component";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./Home/Home.Component";
import { RegisterComponent } from "./Register/Register.Component";
import { HttpModule } from '@angular/http';
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from "./Auth/Auth.service";
import { AboutComponent } from "./About/About.Component";
import { DbService } from "./DbService/Db.service.component";
import { LatestOrderComponent } from "./LatestOrder/LatestOrder.component";
import { OrdersComponent } from "./Oredrs/Orders.component";
import { HomeUserComponent } from "./HomeUser/HomeUser.component";
import { HomeAdminComponent } from "./HomeAdmin/HomeAdmin.component";
import { appRoutes } from "./RouteProtection/Routes";
import { StorageComponent } from "./Storage/Storage.component";
import { StamComponent } from "./Stam/Stam.component";
import { AlertComponent } from './AlertComponent/AlertComponent';
import { AuthGuard } from './RouteProtection/Auth.Guard';
import { SearchFilterPipe } from './SearchPipe/SearchPipe';
import { CommentComponent } from "./Comment/Comment.Component";
import { AdminGuard } from "./RouteProtection/Auth.AdminGuard";
import { ContactComponent } from './Contact/Contact.Component';



@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent,StamComponent,CommentComponent,ContactComponent,
    HomeComponent, AboutComponent, StorageComponent,
    LatestOrderComponent,OrdersComponent, HomeUserComponent,
    HomeAdminComponent ,AlertComponent , SearchFilterPipe
  ],
  imports: [
    BrowserModule, AngularFireModule.initializeApp(FireConfig), HttpModule, FormsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [ AuthService , AngularFireAuth , DbService  , AuthGuard,AdminGuard ] ,

  bootstrap: [AppComponent ]
  
})
export class AppModule { }
