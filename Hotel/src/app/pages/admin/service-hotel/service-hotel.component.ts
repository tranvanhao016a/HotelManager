import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-service-hotel',
  templateUrl: './service-hotel.component.html',
  template: '<h1>Hello World!</h1>',
  styles: ['h1 { font-weight: normal; }'],
  styleUrls: ['./service-hotel.component.scss']
})
export class ServiceHotelComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  navigate(path: string){
    this.router.navigateByUrl(path);
  }

}
