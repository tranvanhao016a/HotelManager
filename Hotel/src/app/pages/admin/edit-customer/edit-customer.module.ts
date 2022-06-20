import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCustomerRoutingModule } from './edit-customer-routing.module';
import { EditCustomerComponent } from './edit-customer.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    EditCustomerComponent
  ],
  imports: [
    CommonModule,
    EditCustomerRoutingModule,
    SharedModule
  ]
})
export class EditCustomerModule { }
