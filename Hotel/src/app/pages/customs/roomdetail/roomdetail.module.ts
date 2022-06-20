import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomdetailRoutingModule } from './roomdetail-routing.module';
import { RoomdetailComponent } from './roomdetail.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    RoomdetailComponent
  ],
  imports: [
    CommonModule,
    RoomdetailRoutingModule,
    SharedModule
  ]
})
export class RoomdetailModule { }
