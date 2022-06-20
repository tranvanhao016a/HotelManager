import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  navigate(path: string){
    this.router.navigateByUrl(path);
  }
 
}
