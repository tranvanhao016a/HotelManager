import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditKindroomRoutingModule } from './edit-kindroom-routing.module';
import { EditKindroomComponent } from './edit-kindroom.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    EditKindroomComponent
  ],
  imports: [
    CommonModule,
    EditKindroomRoutingModule,
    SharedModule
  ]
})
export class EditKindroomModule { }
