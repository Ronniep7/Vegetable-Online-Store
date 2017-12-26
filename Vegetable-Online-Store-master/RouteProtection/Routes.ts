import { HomeComponent } from "../Home/Home.Component";
import { LoginComponent } from "../Login/Login.component";
import { AboutComponent } from "../About/About.Component";
import { RegisterComponent } from "../Register/Register.Component";
import { LatestOrderComponent } from "../LatestOrder/LatestOrder.component";
import { OrdersComponent } from "../Oredrs/Orders.component";
import { HomeUserComponent } from "../HomeUser/HomeUser.component";
import {  AuthGuard } from "./Auth.Guard";
import { HomeAdminComponent } from "../HomeAdmin/HomeAdmin.component";
import { Routes } from "@angular/router/router";
import { StorageComponent } from "../Storage/Storage.component";
import { StamComponent } from "../Stam/Stam.component";
import { CommentComponent } from "../Comment/Comment.Component";
import { AdminGuard } from "./Auth.AdminGuard";
import { ContactComponent } from "../Contact/Contact.Component";



export const appRoutes: Routes = [
    { path: '', redirectTo:'home',pathMatch:'full'},
    { path: 'home', component: HomeComponent , },
    { path: 'login', component: LoginComponent,},
    { path: 'about', component: AboutComponent,},
    { path: 'contact', component: ContactComponent}, 
    { path: 'register', component: RegisterComponent, },

    { path: 'LatestOrder', component: LatestOrderComponent ,canActivate: [AuthGuard]},
    { path: 'Orders', component: OrdersComponent,canActivate: [AuthGuard] },
    { path: 'HomeAdmin', component: HomeAdminComponent ,canActivate: [AuthGuard]},  
    { path: 'Storage', component: StorageComponent ,canActivate: [AuthGuard]},
    { path: 'Stam', component: StamComponent ,canActivate: [AuthGuard]},
    { path: 'HomeUser', component: HomeUserComponent ,canActivate: [AuthGuard] }
    
    
    ];