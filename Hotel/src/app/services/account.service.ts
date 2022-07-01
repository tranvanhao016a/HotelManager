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

   public async editAccount(user :string,password:string){
    return this.http.put(environment.endpoint+'account/updateAccount/'+user,{
       user :user,
        password :password, 
      },
    
    );
   }

   public async addAccount(user :string,password:string){
        return this.http.put(environment.endpoint+'account/addAccount/'+user,{
           user :user,
            password :password, 
          },
    );
  }
   public async deteleRAccount(user:string)
   {
    return this.http.delete(environment.endpoint+'account/deleteAccount/'+user)
   }
   
}

