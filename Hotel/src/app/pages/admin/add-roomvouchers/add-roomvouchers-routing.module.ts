import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomvouchersComponent } from './add-roomvouchers.component';

const routes: Routes = [{ path: '', component: AddRoomvouchersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoomvouchersRoutingModule { }
