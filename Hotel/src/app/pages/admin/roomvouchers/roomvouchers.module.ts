import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomvouchersRoutingModule } from './roomvouchers-routing.module';
import { RoomvouchersComponent } from './roomvouchers.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    RoomvouchersComponent
  ],
  imports: [
    CommonModule,
    RoomvouchersRoutingModule,
    SharedModule
  ]
})
export class RoomvouchersModule { }
