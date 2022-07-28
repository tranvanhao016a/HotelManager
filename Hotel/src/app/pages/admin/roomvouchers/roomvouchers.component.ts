import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomVoucher } from 'src/app/models/roomvoucher.model';
import { Service } from 'src/app/models/service.model';
import { Staff } from 'src/app/models/staff.model';
import { RoomService } from 'src/app/services/room.service';
import { RoomvoucherService } from 'src/app/services/roomvoucher.service';
import { ServiecService } from 'src/app/services/serviec.service';
import { StaffService } from 'src/app/services/staff.service';
import { Customer } from 'src/app/models/customer.model';
@Component({
  selector: 'app-roomvouchers',
  templateUrl: './roomvouchers.component.html',
  styleUrls: ['./roomvouchers.component.scss']
})
export class RoomvouchersComponent implements OnInit {
  public data: RoomVoucher[] = [];
  // public date: Staff[] = [];
  // public datu: Room[] = [];
  // public duta: Service[] = [];
  constructor(public router: Router,
    public RoomVoucher: RoomvoucherService,
    public Staff: StaffService,
    public Room: RoomService,
    public Service: ServiecService) { }

  ngOnInit(): void {
    this.get();
  }
  navigateEdit(path: string,idRV:string) {
    this.router.navigate([path,idRV]);
  }
  navigateAdd(path: string) {
    this.router.navigateByUrl(path);
  }
  public async get() {
    (await this.RoomVoucher.getRoomVoucher()).subscribe(valua => {
      this.data = valua as RoomVoucher[];
      // console.log(this.data)
      for (let item of this.data) {
        item.room = item.room ? item.room : { idRoom: "Null" } as Room;
        item.staff = item.staff ? item.staff : { nameStaff: "Null" } as Staff;
        item.customer = item.customer ? item.customer : { phoneCus: "Null" } as Customer;
        item.services = item.services ?? { nameService: "Null" } as Service;
        item.bookingDate = item.bookingDate ? item.bookingDate : new Date() as Date;
        item.payDay = item.payDay ? item.payDay : new Date() as Date;
        item.numCus = item.numCus ? item.numCus : 0;
      }
    });
  };

}
