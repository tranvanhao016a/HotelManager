import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomvouchersComponent } from './roomvouchers.component';

const routes: Routes = [{ path: '', component: RoomvouchersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomvouchersRoutingModule { }
