import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceHotelRoutingModule } from './service-hotel-routing.module';
import { ServiceHotelComponent } from './service-hotel.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    ServiceHotelComponent
  ],
  imports: [
    CommonModule,
    ServiceHotelRoutingModule,
    SharedModule
  ]
})
export class ServiceHotelModule { }
