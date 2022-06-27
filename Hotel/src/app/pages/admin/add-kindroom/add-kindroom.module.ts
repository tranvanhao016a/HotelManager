import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddKindroomRoutingModule } from './add-kindroom-routing.module';
import { AddKindroomComponent } from './add-kindroom.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    AddKindroomComponent
  ],
  imports: [
    CommonModule,
    AddKindroomRoutingModule,
    SharedModule
  ]
})
export class AddKindroomModule { }
