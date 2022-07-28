// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Service } from 'src/app/models/service.model';
// import { ServiecService } from 'src/app/services/serviec.service';
// @Component({
//   selector: 'app-service-hotel',
//   templateUrl: './service-hotel.component.html',
//   // template: '<h1>Hello World!</h1>',
//   // styles: ['h1 { font-weight: normal; }'],
//   styleUrls: ['./service-hotel.component.scss']
// })
// export class ServiceHotelComponent implements OnInit {

//   constructor(public router: Router, public Service: ServiecService) { }

//   public data: Service[] = [];
//   ngOnInit(): void {
//     this.get();
//   }
//   // myFunction() {
//   //   myFunction();
//   // }
//   public async get() {
//     (await this.Service.getAllService()).subscribe(valua => (this.data = valua as Service[], console.log(this.data)));
//     console.log(this.data)
//   }
//   navigate(path: string, idService: string) {
//     // this.router.navigate([path, { id: id }]);
//     this.router.navigate([path, idService]);
//   }
//   public async deteleS(apiPath: string) {
//     (await this.Service.deteleS(apiPath)).subscribe(() => {
//       this.get();
//     })
//   }

// }

import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { ServiecService } from 'src/app/services/serviec.service';
import { Service } from 'src/app/models/service.model';
import { Router } from '@angular/router';
// declare const myFunction: any;
@Component({
  selector: 'app-service-hotel',
  templateUrl: './service-hotel.component.html',
  styleUrls: ['./service-hotel.component.scss']
})
export class ServiceHotelComponent implements OnInit {

  constructor(public Service: ServiecService, public router: Router) { }
  public data: Service[] = [];
  ngOnInit(): void {
    this.get();
  }
  // myFunction() {
  //   myFunction();
  // }
  public async get() {
    (await this.Service.getAllService()).subscribe(valua => (this.data = valua as Service[], console.log(this.data)));

  }
  navigate(path: string, idService: string) {
    // this.router.navigate([path, { id: id }]);
    this.router.navigate([path, idService]);
  }

  public async deteleS(apiPath: string) {
    (await this.Service.deteleS(apiPath)).subscribe(() => {
      this.get();
    })
  }
}
