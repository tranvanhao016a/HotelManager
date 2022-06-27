import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoomRoutingModule } from './edit-room-routing.module';
import { EditRoomComponent } from './edit-room.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    EditRoomComponent
  ],
  imports: [
    CommonModule,
    EditRoomRoutingModule,
    SharedModule 
  ]
})
export class EditRoomModule { }
