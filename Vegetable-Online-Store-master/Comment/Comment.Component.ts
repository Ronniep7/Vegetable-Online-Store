import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../User/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { DbService } from "../DbService/Db.service.component";
import { AuthService } from "../Auth/Auth.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'Comment',
  templateUrl: `./Comment-component.html`,
  providers: [AngularFireAuth, DbService],
  styles : [
    `$baseColor: #398B93;
  $borderRadius: 10px;
  $imageBig: 100px;
  $imageSmall: 60px;
  $padding: 10px;
  
  body {
     background-color: lighten($baseColor, 30%);
     * { box-sizing: border-box; }
  }
  
  .header {
     background-color: darken($baseColor, 5%);
     color: white;
     font-size: 1.5em;
     padding: 1rem;
     text-align: center;
     text-transform: uppercase;
  }
  
  img {
     border-radius: 50%;
     height: $imageSmall;
     width: $imageSmall;
  }
  
  .table-users {
     border: 1px solid darken($baseColor, 5%);
     border-radius: $borderRadius;
     box-shadow: 3px 3px 0 rgba(0,0,0,0.1);
     max-width: calc(100% - 2em);
     margin: 1em auto;
     overflow: hidden;
     width: 800px;
  }
  
  table {
     width: 100%;
     
     td, th { 
        color: darken($baseColor, 10%);
        padding: $padding; 
     }
     
     td {
        text-align: center;
        vertical-align: middle;
        
        &:last-child {
           font-size: 0.95em;
           line-height: 1.4;
           text-align: left;
        }
     }
     
     th { 
        background-color: lighten($baseColor, 50%);
        font-weight: 300;
     }
     
     tr {     
        &:nth-child(2n) { background-color: white; }
        &:nth-child(2n+1) { background-color: lighten($baseColor, 55%) }
     }
  }
  
  @media screen and (max-width: 700px) {   
     table, tr, td { display: block; }
     
     td {
        &:first-child {
           position: absolute;
           top: 50%;
           transform: translateY(-50%);
           width: $imageBig;
        }
  
        &:not(:first-child) {
           clear: both;
           margin-left: $imageBig;
           padding: 4px 20px 4px 90px;
           position: relative;
           text-align: left;
  
           &:before {
              color: lighten($baseColor, 30%);
              content: '';
              display: block;
              left: 0;
              position: absolute;
           }
        }
  
        &:nth-child(2):before { content: 'Name:'; }
        &:nth-child(3):before { content: 'Email:'; }
        &:nth-child(4):before { content: 'Phone:'; }
        &:nth-child(5):before { content: 'Comments:'; }
     }
     
     tr {
        padding: $padding 0;
        position: relative;
        &:first-child { display: none; }
     }
  }
  
  @media screen and (max-width: 500px) {
     .header {
        background-color: transparent;
        color: lighten($baseColor, 60%);
        font-size: 2em;
        font-weight: 700;
        padding: 0;
        text-shadow: 2px 2px 0 rgba(0,0,0,0.1);
     }
     
     img {
        border: 3px solid;
        border-color: lighten($baseColor, 50%);
        height: $imageBig;
        margin: 0.5rem 0;
        width: $imageBig;
     }
     
     td {
        &:first-child { 
           background-color: lighten($baseColor, 45%); 
           border-bottom: 1px solid lighten($baseColor, 30%);
           border-radius: $borderRadius $borderRadius 0 0;
           position: relative;   
           top: 0;
           transform: translateY(0);
           width: 100%;
        }
        
        &:not(:first-child) {
           margin: 0;
           padding: 5px 1em;
           width: 100%;
           
           &:before {
              font-size: .8em;
              padding-top: 0.3em;
              position: relative;
           }
        }
        
        &:last-child  { padding-bottom: 1rem !important; }
     }
     
     tr {
        background-color: white !important;
        border: 1px solid lighten($baseColor, 20%);
        border-radius: $borderRadius;
        box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
        margin: 0.5rem 0;
        padding: 0;
     }
     
     .table-users { 
        border: none; 
        box-shadow: none;
        overflow: visible;
     }
  }

`]
})
export class CommentComponent 
{
  constructor(private  Log : AppComponent ,  private AuthFire: AngularFireAuth, private Service: DbService, public AuthService: AuthService)
  {  
     this.GetComments();
  }

  Comments:any[];
  GetComments()
  {
    const req = this.Service.Get('Comments');
    req.map(res => <any []>res.json()).
    subscribe(res =>{
    this.Comments = res;
    console.log( this.Comments);
    }, 
    (err : any) => {
    console.log("error : " + err);
    });
  }
}