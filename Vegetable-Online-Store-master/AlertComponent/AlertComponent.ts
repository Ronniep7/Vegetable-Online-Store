
import { Component , Input } from '@angular/core';


@Component({
  selector: 'Alert',
  templateUrl: `./AlertComponent.html`,
  styles : [`.btn-circle {
    width: 49px;
    height: 49px;
    text-align: center;
    padding: 5px 0;
    font-size: 20px;
    line-height: 2.00;
    border-radius: 30px;
  }
  
  .btn-circle-micro {
    width: 15px;
    height: 15px;
    text-align: center;
    padding: 1px 0;
    padding-top: 5px;
    font-size: 11px;
    line-height: 0.1;
    border-radius: 30px;
  }
  
  .btn-circle-sm {
    width: 35px;
    height: 35px;
    text-align: center;
    padding: 2px 0;
    font-size: 20px;
    line-height: 1.65;
    border-radius: 30px;
  }
  
  .btn-circle-lg {
    width: 79px;
    height: 79px;
    text-align: center;
    padding: 13px 0;
    font-size: 30px;
    line-height: 2.00;
    border-radius: 70px;
  }`]
})
export class AlertComponent  {

   
@Input() Alerts : number;

 }