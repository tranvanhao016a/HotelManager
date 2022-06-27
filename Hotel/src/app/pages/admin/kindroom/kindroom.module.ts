import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KindroomRoutingModule } from './kindroom-routing.module';
import { KindroomComponent } from './kindroom.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    KindroomComponent
  ],
  imports: [
    CommonModule,
    KindroomRoutingModule,
    SharedModule

  ]
})
export class KindroomModule { }
