import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public http: HttpClient) { }
  public async getAllCus(apiPath:string):Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint +apiPath);
    return result;
   }

   public async getCus(phoneCus:string):Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint +'customer/getCustomer/'+phoneCus);
    return result;
   }
   
   public async editCus( idCard:string,
    nameCus:string,
    phoneCus:string,
    sexCus:string,
    address:string){
    return this.http.put(environment.endpoint+'customer/updateCustomer/'+phoneCus,{
      idCard:idCard,
      nameCus: nameCus,
      phoneCus:phoneCus,
      sexCus:sexCus,
      address:address,
      },
    
    );
   }

  //  public async addCus(idCard:string,
  //   nameCus: string,
  //   phoneCus:string,
  //   sexCus:string,
  //   address:string){
  //       return this.http.put(environment.endpoint+'account/addAccount/'+idCard,{
  //         idCard:idCard,
  //         nameCus: nameCus,
  //         phoneCus:phoneCus,
  //         sexCus:sexCus,
  //         address:address,
  //         },
  //   );
  // }
  //  public async deteleCus(idCard:string)
  //  {
  //   return this.http.delete(environment.endpoint+'account/deleteAccount/'+idCard)
  //  }
}
