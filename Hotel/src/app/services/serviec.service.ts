import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiecService {

  constructor(public http: HttpClient) { }
  public async getAllService(): Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint + 'service/getAllService');
    return result;
  }

  public async getService(idService: string): Promise<Observable<any>> {
    let result = this.http.get(environment.endpoint + 'service/getService/' + idService);
    return result;
  }

  public async addService(
    idService:string,
    nameService:string,
    priceService: number,) 
    {
    return this.http.post(environment.endpoint + 'service/addService', {
      idService: idService,
      nameService: nameService,
      priceService: priceService,
    },
    );
  }

  public async editService(idService: string,
    nameService: string,
    priceService: number,) {
    return this.http.put(environment.endpoint + 'service/updateService/' + idService, {
      idService: idService,
      nameService: nameService,
      priceService: priceService,
    },

    );
  }
  public async deteleS(idService: string) {
    return this.http.delete(environment.endpoint + 'service/deleteService/' + idService)
  }


}
