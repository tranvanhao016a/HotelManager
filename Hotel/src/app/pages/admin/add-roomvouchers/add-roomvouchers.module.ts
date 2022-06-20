import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoomvouchersRoutingModule } from './add-roomvouchers-routing.module';
import { AddRoomvouchersComponent } from './add-roomvouchers.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    AddRoomvouchersComponent
  ],
  imports: [
    CommonModule,
    AddRoomvouchersRoutingModule,
    SharedModule
  ]
})
export class AddRoomvouchersModule { }
