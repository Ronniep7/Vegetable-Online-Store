export class comment{
    
    From : string;
    Email : string ;
    Content : string;
    Id : number;
    
    
    constructor(_From : string , _Email : string , _Content : string
    ) {
      this.From = _From;
      this.Email = _Email;
      this.Content = _Content;  
    }
}