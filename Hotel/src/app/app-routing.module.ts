import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/customs/home/home.module').then(m => m.HomeModule) },
 { path: 'about', loadChildren: () => import('./pages/customs/about/about.module').then(m => m.AboutModule) },
{ path: 'contact', loadChildren: () => import('./pages/customs/contact/contact.module').then(m => m.ContactModule) },
 { path: 'rooms', loadChildren: () => import('./pages/customs/rooms/rooms.module').then(m => m.RoomsModule) },
 { path: 'roomdetail', loadChildren: () => import('./pages/customs/roomdetail/roomdetail.module').then(m => m.RoomdetailModule) },
{ path: 'booking', loadChildren: () => import('./pages/customs/booking/booking.module').then(m => m.BookingModule) },
{ path: 'customer', loadChildren: () => import('./pages/admin/customer/customer.module').then(m => m.CustomerModule) },
{ path: 'staff', loadChildren: () => import('./pages/admin/staff/staff.module').then(m => m.StaffModule) },
{ path: 'room', loadChildren: () => import('./pages/admin/room/room.module').then(m => m.RoomModule) },
{ path: 'login', loadChildren: () => import('./pages/admin/login/login.module').then(m => m.LoginModule) },

{ path: 'service-hotel', loadChildren: () => import('./pages/admin/service-hotel/service-hotel.module').then(m => m.ServiceHotelModule) },
{ path: 'add-staff', loadChildren: () => import('./pages/admin/add-staff/add-staff.module').then(m => m.AddStaffModule) },
{ path: 'edit-staff', loadChildren: () => import('./pages/admin/edit-staff/edit-staff.module').then(m => m.EditStaffModule) },
{ path: 'dashboard', loadChildren: () => import('./pages/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'add-customer', loadChildren: () => import('./pages/admin/add-customer/add-customer.module').then(m => m.AddCustomerModule) },
  { path: 'edit-customer', loadChildren: () => import('./pages/admin/edit-customer/edit-customer.module').then(m => m.EditCustomerModule) },
  { path: 'edit-service', loadChildren: () => import('./pages/admin/edit-service/edit-service.module').then(m => m.EditServiceModule) },
  { path: 'add-service', loadChildren: () => import('./pages/admin/add-service/add-service.module').then(m => m.AddServiceModule) },
  { path: 'user', loadChildren: () => import('./pages/admin/user/user.module').then(m => m.UserModule) },
  //{ path: 'add-user', loadChildren: () => import('./pages/admin/add-user/add-user.module').then(m => m.AddUserModule) },
  { path: 'edit-user', loadChildren: () => import('./pages/admin/edit-user/edit-user.module').then(m => m.EditUserModule) },
  { path: 'roomvouchers', loadChildren: () => import('./pages/admin/roomvouchers/roomvouchers.module').then(m => m.RoomvouchersModule) },
  { path: 'roomvouchers-detail', loadChildren: () => import('./pages/admin/roomvouchers-detail/roomvouchers-detail.module').then(m => m.RoomvouchersDetailModule) },
  { path: 'add-roomvouchers', loadChildren: () => import('./pages/admin/add-roomvouchers/add-roomvouchers.module').then(m => m.AddRoomvouchersModule) },
  { path: 'add-room', loadChildren: () => import('./pages/admin/add-room/add-room.module').then(m => m.AddRoomModule) },
  { path: 'edit-room', loadChildren: () => import('./pages/admin/edit-room/edit-room.module').then(m => m.EditRoomModule) },
  { path: 'edit-room/:id', loadChildren: () => import('./pages/admin/edit-room/edit-room.module').then(m => m.EditRoomModule) },
  { path: 'kindroom', loadChildren: () => import('./pages/admin/kindroom/kindroom.module').then(m => m.KindroomModule) },
  { path: 'add-kindroom', loadChildren: () => import('./pages/admin/add-kindroom/add-kindroom.module').then(m => m.AddKindroomModule) },
  { path: 'edit-kindroom', loadChildren: () => import('./pages/admin/edit-kindroom/edit-kindroom.module').then(m => m.EditKindroomModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
