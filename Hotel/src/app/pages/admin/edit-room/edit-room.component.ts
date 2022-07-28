import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import {KindRoom} from 'src/app/models/kindroom.model'
import {KindroomService} from 'src/app/services/kindroom.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent implements OnInit {
 public data : KindRoom[]= [];
 public editform!: FormGroup;
  constructor(public Room: RoomService,
      public Kind : KindroomService,
      public router : Router,
      public route: ActivatedRoute,
      public formBuider : FormBuilder) {
        this.editform = this.formBuider.group({
          status:'',
          // kindRoom:'',
        })
        }
    id : string ='';
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log( this.route.snapshot.paramMap.get('id'))
    this.get('kindroom/getAllKindRoom');
  }
  public async get(apiPath:string){
    (await  this.Kind.getkindRoom(apiPath)).subscribe(valua=>(this.data = valua as KindRoom[]));
      console.log(this.data)
  }
  public async update() {
    console.log(this.editform.value);
   (await this.Room.editRoom(

      this.id,
      this.editform.value.kindRoom
      ,this.editform.value.status,
      
      
   )).subscribe((value: any) => {
      alert(value['message']);
    });
    
  }

}
