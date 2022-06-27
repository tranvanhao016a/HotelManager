import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditKindroomComponent } from './edit-kindroom.component';

const routes: Routes = [{ path: '', component: EditKindroomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditKindroomRoutingModule { }
