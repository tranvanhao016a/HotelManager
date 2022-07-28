import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import {KindRoom} from 'src/app/models/kindroom.model'
import {KindroomService} from 'src/app/services/kindroom.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent implements OnInit {
 public data : any;
 
 public editform!: FormGroup;
  constructor(public Room: RoomService,
      
      public router : Router,
      public route: ActivatedRoute,
      public formBuider : FormBuilder) {
        this.editform = this.formBuider.group({
          status:'',
          // kindRoom:'',
        })
        }
        idRoom : string ='';
  ngOnInit(): void {
    this.idRoom = this.route.snapshot.paramMap.get('idRoom')!;
    console.log( this.route.snapshot.paramMap.get('idRoom'))
    this.get(this.idRoom);
  }
  public async get(idRoom:string){
    console.log(this.idRoom);
    (await  this.Room.getRoom(idRoom)).subscribe(valua=>(this.data = valua,console.log(valua)));
      
  }
  public async update() {
    console.log(this.editform.value);
   (await this.Room.editRoom(
      this.idRoom,
      this.editform.value.kindRoom,
      this.editform.value.status,
      
      
   )).subscribe((value: any) => {
      alert(value['message']);
    });
    
  }

}
