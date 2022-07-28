import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(public router: Router,public Cus : CustomerService) { }
  public data : Customer[] = [];
  ngOnInit(): void {
    this.get('customer/getAllCustomer');
  }

  public async get(apiPath:string){
    (await  this.Cus.getAllCus(apiPath)).subscribe(valua=>(this.data = valua as Customer[]));
      console.log(this.data)
  }
  navigate(path: string, phoneCus: string) {
    this.router.navigate([path, { phoneCus: phoneCus }]);
  }
 
 
}
