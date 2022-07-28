import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(public http: HttpClient) { }
  public async getAllStaff():Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint +'staff/getAllStaff');
    return result;
   }
   public async getStaff(idStaff:string):Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint +'staff/getStaff/'+idStaff);
    return result;
   }
   public async editStaff(  idStaff: string,
    nameStaff:string,
    position:string,
    phoneStaff:string,
    sexStaff :string,
    status: string,
    address:string,){
    return this.http.put(environment.endpoint+'staff/updateStaff/'+idStaff,{
      idStaff:idStaff,
      nameStaff: nameStaff,
      position:position,
      phoneStaff:phoneStaff,
      sexStaff:sexStaff,
      status:status,
      address:address,
      },
    
    );
   }
   public async addStaff( idStaff: string,
    nameStaff:string,
    position:string,
    phoneStaff:string,
    sexStaff :string,
    status: string,
    address:string,){
    return this.http.post(environment.endpoint+'staff/addStaff',{
      idStaff:idStaff,
      nameStaff: nameStaff,
      position:position,
      phoneStaff:phoneStaff,
      sexStaff:sexStaff,
      status:status,
      address:address,
      },
    
    );
   }
   public async deteleS(idStaff:string)
   {
    return this.http.delete(environment.endpoint+'staff/deleteStaff/'+idStaff)
   }
}
