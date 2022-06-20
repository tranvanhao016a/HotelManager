import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCustomerRoutingModule } from './add-customer-routing.module';
import { AddCustomerComponent } from './add-customer.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    AddCustomerRoutingModule,
    SharedModule
  ]
})
export class AddCustomerModule { }
