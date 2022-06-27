import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiecService } from 'src/app/services/serviec.service';
@Component({
  selector: 'app-service-hotel',
  templateUrl: './service-hotel.component.html',
  template: '<h1>Hello World!</h1>',
  styles: ['h1 { font-weight: normal; }'],
  styleUrls: ['./service-hotel.component.scss']
})
export class ServiceHotelComponent implements OnInit {

  constructor(public router: Router, public Service: ServiecService) { }

  public data : Service[] = [];
  ngOnInit(): void {
    this.get('service/getAllService');
  }
  // myFunction() {
  //   myFunction();
  // }
  public async get(apiPath:string){
    (await  this.Service.getService(apiPath)).subscribe(valua=>(this.data = valua as Service[],console.log(this.data)));
      console.log(this.data)
  }
  navigate(path: string){
    this.router.navigateByUrl(path);
  }

}
