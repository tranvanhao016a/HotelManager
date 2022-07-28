import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(public http: HttpClient) { }
  public async getAllRoom():Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint +'room/getAllRoom');
    return result;
   }
   public async getRoom(idRoom:string):Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint +'room/getRoom/'+idRoom);
    return result;
   }
   public async editRoom(idRoom :string,kindRoom:object,status:string){
    return this.http.put(environment.endpoint+'room/updateRoom/'+idRoom,{
       idRoom :idRoom,
        kindRoom : kindRoom, status : status
     
      },

    );
   }

   public async addRoom(idRoom :string,kindRoom:object,status:string){
    return this.http.post(environment.endpoint+'room/addRoom/',{
       idRoom :idRoom,
        kindRoom : kindRoom, 
        status : status,
        // roomVouche:roomVoucher
      },

    );
  }
   public async deteleRoom(idRoom:string)
   {
    return this.http.delete(environment.endpoint+'room/deleteRoom/'+idRoom)
   }

}
