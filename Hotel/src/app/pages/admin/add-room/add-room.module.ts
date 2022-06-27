import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoomRoutingModule } from './add-room-routing.module';
import { AddRoomComponent } from './add-room.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    AddRoomComponent
  ],
  imports: [
    CommonModule,
    AddRoomRoutingModule,
    SharedModule
  ]
})
export class AddRoomModule { }
