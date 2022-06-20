import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomvouchersDetailRoutingModule } from './roomvouchers-detail-routing.module';
import { RoomvouchersDetailComponent } from './roomvouchers-detail.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    RoomvouchersDetailComponent
  ],
  imports: [
    CommonModule,
    RoomvouchersDetailRoutingModule,
    SharedModule
  ]
})
export class RoomvouchersDetailModule { }
