import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { User, Customer } from "../User/User";




export class DbService {

    Get1(ctrl: string, UserName: string) {
        
        return this.http.get(this.url + ctrl + '?email=' + UserName , { headers: this.header } );
    }
    private url: string;
    private header = new Headers();


    GetUserState(ctrl: string) {
        console.log(this.url + ctrl);
        return this.http.get(this.url + ctrl+"/?session=" + localStorage.getItem("Session"));
    }


    Get(ctrl: string) {
        console.log(this.url + ctrl);
        return this.http.get(this.url + ctrl, { headers: this.header });
    }

    delete(ctrl: string, id: number) {

        return this.http.delete(this.url + ctrl + "/" + id, { headers: this.header });
    }

    login(ctrl: string, body: User) {
        return this.http.post(this.url + ctrl + "/?email=" + body.Email + "&password=" + body.Password, {});
    }

    LogOut(ctrl: string, session: string) {
        return this.http.delete(this.url + ctrl + "/?session=" + session);
    }

    post(ctrl: string, Body: any) {
        return this.http.post(this.url + ctrl, Body, { headers: this.header });
    }

    Edit(ctrl: string, body: any) {
        return this.http.put(this.url + ctrl+"/"+body.Id , body, { headers: this.header });
    }


    constructor(@Inject(Http) private http: Http) {
        this.url = "http://localhost:61359/api/";
        this.header.append("UserKey", localStorage.getItem("Session"));
    }

}