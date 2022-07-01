import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomvoucherService {

  constructor(public http: HttpClient) { }
  public async getRoomVoucher(apiPath:string):Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint +apiPath);
    return result;
   }
}
