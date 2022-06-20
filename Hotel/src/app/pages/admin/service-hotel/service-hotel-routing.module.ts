import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceHotelComponent } from './service-hotel.component';

const routes: Routes = [{ path: '', component: ServiceHotelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceHotelRoutingModule { }
