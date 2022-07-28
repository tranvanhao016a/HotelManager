import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KindRoom } from 'src/app/models/kindroom.model';
import { KindroomService } from 'src/app/services/kindroom.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {

  public data : KindRoom[]= [];
 public addform!: FormGroup;
  constructor(public Room: RoomService,
     public Kind : KindroomService,
      public router : Router,
       public route: ActivatedRoute,
      public formBuider : FormBuilder) {
        this.addform = this.formBuider.group({
          idRoom:'',
          status:'',
          kindRoom:'',
        })
        }
    // id : string ='';
  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id')!;
    // console.log( this.route.snapshot.paramMap.get('id'))
    this.getKindRoom('kindroom/getAllKindRoom');
  }
  public async getKindRoom(apiPath:string){
    (await  this.Kind.getkindRoom(apiPath)).subscribe(valua=>(this.data = valua as KindRoom[], console.log(this.data) ));
  }
  public async add() {
    console.log(this.addform.value);
   (await this.Room.addRoom(

      this.addform.value.idRoom,
      this.addform.value.kindRoom
      ,this.addform.value.status
      // this.addform.value.roomVoucher
      
   )).subscribe((value: any) => {
      alert(value['message']);
    });
    
  }
  


}
