import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationDetailComponent } from './reservation-detail.component';

const routes: Routes = [{ path: '', component: ReservationDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationDetailRoutingModule { }
