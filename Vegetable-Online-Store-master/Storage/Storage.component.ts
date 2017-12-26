import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DbService } from "../DbService/Db.service.component";
import { AngularFireAuth } from "angularfire2/auth";
import { Customer } from '../User/User';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from "../Auth/Auth.service";


@Component({
  selector: 'Storage',
  templateUrl: `./Storage.component.html`,
  providers: [DbService, AngularFireAuth]
})
export class StorageComponent {


  constructor(private Service: DbService) {
    this.GetStorage();
    this.GetProducts();
    
  }


  Refresh()
  {
    this.GetStorage();  
  }



  fileChange(event:any) {  
  let fileList: FileList = event.target.files; 
  this.Product.ImageUrl = fileList[0].name;
  console.log("second");
  console.log(this.Product.ImageUrl);
  }

  Storage: any []  = [];

  Emess = "";
  EmessType = true ;

  GetStorage() {
    const req = this.Service.Get('Storage');
    req.map(res => <any[]>res.json()).
      subscribe(res => {
        this.Storage = res;
        console.log(this.Storage);},
      (err: any) => {
        console.log("error : " + err);
      });
  }

  IdTemp : number ;
  GetProduct(Id : number)
  {
    this.IdTemp = Id;
  }

  ModeUpdate = false;


  GetPrudoctDetails(item : any)
  {
    this.ModeUpdate = true ;
    console.log(item);
    let ChosenProduct =  this.Products.filter(prod => prod.Id == item.ProductId)[0];
    console.log(ChosenProduct.Id);
    this.Product.CustomerPrice =  ChosenProduct.CustomerPrice;
    this.Product.MarketPrice =  ChosenProduct.MarketPrice;
    this.Product.ProductName =  ChosenProduct.ProductName;
    this.Product.Id =  ChosenProduct.Id;
    
    console.log("first");
    console.log(this.Product.ImageUrl);
    console.log(this.Product);
  }



  Products : any [];

  GetProducts()
  {
   const req = this.Service.Get('Products');
   req.map(res => <any[]>res.json()).
     subscribe(res => {
       this.Products = res;
     },
     (err: any) => {
       
     });
 }


  
  deleteProduct() {
this.Service.delete("Products" , this.IdTemp).subscribe(Response => {


  console.log("You Delete The Product Successfully");
},
  (err) => {
    console.log("Error : the Prudoct Is Not Deleted" + err);
  });
  }





Product  = new Product("",0,0,"");

  AddProduct()
  {
    console.log(this.Product);
    const req = this.Service.post("Products",this.Product);
    req.map(res => <any>res.json()).
      subscribe(response => {
        console.log(response);
        this.Emess = response;
        this.EmessType = false;
      }, (err: any) => {
        console.log("Problem Definnition :");
        console.log( err);
        this.Emess =  err.json(); 
        this.EmessType = true;
      });


  }


  EditProduct() {
    console.log("Here");   
    
    console.log(this.Product);   
    
    this.Service.Edit( "Products",this.Product).subscribe(Response => {
      console.log("You Update The Product Successfully");
      console.log(Response);
      this.Emess = "You Update The Product Successfully";
      this.EmessType = false;

    },
      (err) => {
        console.log("Error : the User Is Not Update" + err);
        this.Emess =  err.json(); 
        this.EmessType = true;
      });
  }






}


export class Product{

MarketPrice : number;
CustomerPrice : number ;
ProductName : string;
Id : number;
ImageUrl : string;


constructor(product_name : string , market_price : number , customer_price : number,_ImageUrl : string
) {
  this.ProductName = product_name;
  this.CustomerPrice = customer_price;
  this.MarketPrice = market_price;  
  this.ImageUrl=_ImageUrl;
}



}


