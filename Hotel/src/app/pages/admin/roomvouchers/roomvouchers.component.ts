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
  public date: Staff[] = [];
  public datu: Room[] = [];
  public duta: Service[] = [];
  constructor(public router: Router,
    public RoomVoucher: RoomvoucherService,
    public Staff: StaffService,
    public Room: RoomService,
    public Service: ServiecService) { }

  ngOnInit(): void {
    this.get('roomvoucher/getAllRoomVoucher');
    // this.getS('staff/getAllStaff');
  }
  navigate(path: string) {
    this.router.navigateByUrl(path);
  }
  public async get(apiPath: string) {
    (await this.RoomVoucher.getRoomVoucher(apiPath)).subscribe(valua => {
      this.data = valua as RoomVoucher[];
      for (let item of this.data) {
        item.room = item.room ? item.room : { idRoom: "Null" } as Room;
        item.staff = item.staff ? item.staff : { nameStaff: "Null" } as Staff;
        item.customer = item.customer ? item.customer : { phoneCus: "Null" } as Customer;
        // item.services = item.services ? item.services : { nameService: "Null"} as Service;
        item.bookingDate = item.bookingDate ? item.bookingDate : new Date() as Date;
        item.payDay = item.payDay ? item.payDay : new Date() as Date;
        item.numCus = item.numCus ? item.numCus : 0;
      }
      console.log(this.data)
    });
  };



  public async getR(apiPath: string) {
    (await this.Room.getRoom(apiPath)).subscribe(valua => (this.datu = valua as Room[]
      , console.log(this.datu)));

  }
  public async getS(apiPath: string) {
    (await this.Staff.getStaff(apiPath)).subscribe(valua => (this.date = valua as Staff[]));
    console.log(this.date)
  }
  public async getServer(apiPath: string) {
    (await this.Service.getService(apiPath)).subscribe(valua => (this.duta = valua as Service[]));
  }
}
