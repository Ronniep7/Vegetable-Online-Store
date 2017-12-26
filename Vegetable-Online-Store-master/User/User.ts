export class  User {
    
        constructor(email: string, password: string)
         {
            this.Email = email;
            this.Password = password;
        }
    
        Email: string;
        Password: string;
    }
    
    
    
    export class Customer {
        
            constructor( First_name : string, last_name: string,   email: string, password: string,
                 address: string, business: string , phone : string )
             {
                this.Email = email;
                this.Password = password; 
                 this.Address = address;
                this.Phone = phone;
                  this.LastName = last_name;
                  this.Business = business;
                  this.Name = First_name;
                  this.Role = 1;
              }
        
            Email: string;
            Password: string;
            CPassword: string;
            Address: string;
            Phone: string;
            LastName: string;
            Name: string;
            Business: string;
            Role : number;
    
    
    
    
        }
    
    

