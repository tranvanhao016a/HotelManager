import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(public http: HttpClient) { }
  public async getAllAccounts():Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint +'account/getAllAccount');
    return result;
   }

   public async getAccount(user :string):Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint +'account/getAccount/'+user);
    return result;
   }

   public async editAccount(user :string,email:string,password:string){
    return this.http.put(environment.endpoint+'account/updateAccount/'+user,{
        user :user,
        email:email,
        password :password,
      },

    );
   }
   

  //  public async addAccount(user :string,password:string){
  //       return this.http.put(environment.endpoint+'account/addAccount/'+user,{
  //          user :user,
  //           password :password,
  //         },
  //   );
  // }
}

