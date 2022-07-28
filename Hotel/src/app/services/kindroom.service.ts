import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KindroomService {

  constructor(public http: HttpClient) { }
  public async getAllkindRoom():Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint +'kindroom/getAllKindRoom');
    return result;
   }
   public async getkindRoom(idKindRoom:string):Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint +'kindroom/getKindRoom/'+idKindRoom);
    return result;
   }
   
   public async editkindRoom( 
    idKindRoom:string,
    nameKindRoom:string,
    image:string,
    cusMax:number,
    priceRoom:number,){
    return this.http.put(environment.endpoint+'kindroom/updateKindRoom/'+idKindRoom,{
      idKindRoom:idKindRoom,
      nameKindRoom:nameKindRoom,
      image:image,
      cusMax:cusMax,
      priceRoom:priceRoom,
      },
    
    );
   }

   public async addkindRoom( 
    idKindRoom:string,
    nameKindRoom:string,
    image:string,
    cusMax:number,
    priceRoom:number,){
    return this.http.post(environment.endpoint+'kindroom/addKindRoom',{
      idKindRoom:idKindRoom,
      nameKindRoom:nameKindRoom,
      image:image,
      cusMax:cusMax,
      priceRoom:priceRoom,
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
   public async deteleKind(idKindRoom:string)
   {
    return this.http.delete(environment.endpoint+'kindroom/deleteKindRoom/'+idKindRoom)
   }
}
