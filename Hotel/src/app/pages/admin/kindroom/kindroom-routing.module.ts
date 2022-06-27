import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KindroomComponent } from './kindroom.component';

const routes: Routes = [{ path: '', component: KindroomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KindroomRoutingModule { }
