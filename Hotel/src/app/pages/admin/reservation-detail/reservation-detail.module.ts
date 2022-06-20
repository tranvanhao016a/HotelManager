import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationDetailRoutingModule } from './reservation-detail-routing.module';
import { ReservationDetailComponent } from './reservation-detail.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    ReservationDetailComponent
  ],
  imports: [
    CommonModule,
    ReservationDetailRoutingModule,
    SharedModule
  ]
})
export class ReservationDetailModule { }
