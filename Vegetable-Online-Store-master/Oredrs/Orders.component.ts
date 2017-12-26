import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../User/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { DbService } from "../DbService/Db.service.component";
import { AuthService } from "../Auth/Auth.service";
import { AppComponent } from "../app.component";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'Orders',
  templateUrl: `./Orders.component.html`,
  providers: [AngularFireAuth, DbService]
})
export class OrdersComponent {
  ErrMsg = "";
  date = new Date().toLocaleTimeString();
  constructor(private Log: AppComponent, private router: Router, private AuthFire: AngularFireAuth, private Service: DbService, public AuthService: AuthService) {
    this.GetProducts();
    this.GetStorage();
    if(this.AuthService.Role)
      this.GetBudjet();
  
  }

  //Orders
  Products: any[];
  selectedVeg: any;
  Amount: number = 0;
  TotalForPurche = 0;
  ShopList: any[] = [];
   Emsg ='';

  Storage: any[] = [];
  Filterd: any[] = [];
  
  GetStorage() {
    const req = this.Service.Get('Storage');
    req.map(res => <any[]>res.json()).
      subscribe(res => {
        this.Storage = res;
        if (localStorage.getItem("P_Id")) {
          debugger;
          this.selectedVeg =    this.Storage.filter(S => S.ProductId ==  Number.parseFloat(localStorage.getItem("P_Id")))[0];
        }
        localStorage.removeItem("P_Id");
      this.Filterd = this.Storage.filter(S => S.Amount >= 1);
      console.log(this.Storage);
      },
      (err: any) => {
        console.log("error : " + err);
      });
  }



  GetProducts() {
    const req = this.Service.Get('Products');
    req.map(res => <any[]>res.json()).
      subscribe(res => {
        this.Products = res;
      },
      (err: any) => {
        console.log("error : " + err);

      });
  }


Budjet = 0;

  GetBudjet() {
    console.log("Get The Budjet :");
    const req = this.Service.Get('Managment');
    req.map(res => <any>res.json()).
      subscribe(res => {
        console.log(res);
        this.Budjet = res.Budjet;
      },
      (err: any) => {
        console.log("error : " + err);

      });
  }

  Purche() {
    let Order = { UserEmail: this.AuthFire.auth.currentUser.email, OrderPrice: this.TotalForPurche, OrderDate: new Date() };
    if(this.TotalForPurche >=16)
      {
        const req1 = this.Service.post('Orders', Order);
        req1.subscribe(posts => {
          this.DecreaseFromStorage();
          this.ShopList = null;
          if (this.AuthService.Role) {
            this.router.navigate(['./HomeAdmin']);
          }
          else {
            this.router.navigate(['./LatestOrder']);
          }
    
        }, (err: any) => {
          console.log("error : " + err);
        });
      }
      else
        this.Emsg = "The Total Price Has To Be More Than 15 ₪";
  
  }

  DecreaseFromStorage() {
    for (var index = 0; index < this.ShopList.length; index++) {
      let body = {
        ProductName: this.ShopList[index].Name,
        Amount: this.ShopList[index].Amount,
        ProductId: this.ShopList[index].Id
      }
      console.log(body);
      let req = this.Service.Edit('Storage', body);
      req.map(res => <any[]>res.json()).
        subscribe(res => {
          this.Products = res;
        },
        (err: any) => {
          console.log("error : " + err);

        });
    }
  }



  AddToShopList() {
    this.Emsg ="";
    let price = this.Products.filter(Veg => Veg.Id == this.selectedVeg.ProductId)[0].CustomerPrice;
    console.log('The Price : ' + price);
    let AddedProduct = {
      Id: this.selectedVeg.ProductId,
      Name: this.selectedVeg.ProductName,
      Price: price,
      Amount: this.Amount,
      Total: this.Amount * price
    }
   if(this.ShopList.filter(item => item.Name == AddedProduct.Name).length!=0)
    {
      this.Emsg = "This Product Is Already On Your Shop List";
    }
    else if (!Number.isInteger(AddedProduct.Amount)||AddedProduct.Amount <= 0) {

      this.Emsg = "Invalid Amount";
    }
    else {
      console.log("Delete Term");     
      this.ShopList.push(AddedProduct);
      this.TotalForPurche += this.Amount * price;
      this.Amount = 0;
      this.Budjet = this.Budjet - this.TotalForPurche;
      
    }
    let index = this.Storage.indexOf(this.selectedVeg);

    this.Storage.splice(index, 1);


  }

  DeleteOrderItem(Product: any) {

    this.TotalForPurche = this.TotalForPurche - Product.Total;
    let index = this.ShopList.indexOf(Product);

    this.ShopList.splice(index, 1);

  }


}




