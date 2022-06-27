import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddKindroomComponent } from './add-kindroom.component';

const routes: Routes = [{ path: '', component: AddKindroomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddKindroomRoutingModule { }
