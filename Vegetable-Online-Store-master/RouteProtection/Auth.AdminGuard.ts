
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../Auth/Auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
 
    constructor(private router: Router ,private Auth : AuthService) { 
        this.Auth.RoleCheck();
     }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.Auth.Role) {
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}