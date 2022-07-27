import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(public http: HttpClient) { }
  public async getAccount(apiPath:string):Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint +apiPath);
    return result;
   }

   public async editAccount(email :string,password:string){
    return this.http.put(environment.endpoint+'account/updateAccount/'+email,{
      email :email,
        password :password, 
      },
    
    );
   }

   public async addAccount(email :string,password:string){
        return this.http.put(environment.endpoint+'account/addAccount/'+email,{
          email :email,
            password :password, 
          },
    );
  }
   public async deteleRAccount(email:string)
   {
    return this.http.delete(environment.endpoint+'account/deleteAccount/'+email)
   }
   
}

