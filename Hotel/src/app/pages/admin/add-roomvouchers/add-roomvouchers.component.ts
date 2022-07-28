import { Component, OnInit } from '@angular/core';
import {RoomService} from 'src/app/services/room.service'
import {StaffService} from 'src/app/services/staff.service'
import {Room} from 'src/app/models/room.model'
@Component({
  selector: 'app-add-roomvouchers',
  templateUrl: './add-roomvouchers.component.html',
  styleUrls: ['./add-roomvouchers.component.scss']
})
export class AddRoomvouchersComponent implements OnInit {
  public dataRoom : Room[]= [];
  constructor(public Room : RoomService,public Staff : StaffService,) { }

  ngOnInit(): void {
    this.getAllRoom();
  }
  checkNewCus=false;
  checkCus(){

  }

  public async getAllRoom(){
    (await  this.Room.getAllRoom()).subscribe(valua=>(this.dataRoom = valua as Room[],console.log(this.dataRoom)));
      //
  }

}
