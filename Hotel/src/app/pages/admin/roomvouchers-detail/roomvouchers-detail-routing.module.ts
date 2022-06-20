import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomvouchersDetailComponent } from './roomvouchers-detail.component';

const routes: Routes = [{ path: '', component: RoomvouchersDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomvouchersDetailRoutingModule { }
