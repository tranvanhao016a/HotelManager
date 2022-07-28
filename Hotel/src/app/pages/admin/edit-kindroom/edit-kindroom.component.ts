import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KindRoom } from 'src/app/models/kindroom.model';
import { KindroomService } from 'src/app/services/kindroom.service';

@Component({
  selector: 'app-edit-kindroom',
  templateUrl: './edit-kindroom.component.html',
  styleUrls: ['./edit-kindroom.component.scss']
})
export class EditKindroomComponent implements OnInit {
  public data: KindRoom ={
      idKindRoom: '',
      nameKindRoom: '',
      image: '',
      cusMax: 0,
      priceRoom: 0,
  }
  public editform!: FormGroup;
  constructor(public KindRoom: KindroomService,
    public router: Router,
    public route: ActivatedRoute,
    public formBuider: FormBuilder) {
    this.editform = this.formBuider.group({
      // idKindRoom: '',
      nameKindRoom: '',
      image: '',
      cusMax: 0,
      priceRoom: 0,
    })
  }
idKindRoom: string='';
  ngOnInit(): void {
    // this.anh();
    this.idKindRoom = this.route.snapshot.paramMap.get('idKindRoom')!;
    // console.log(    this.idStaff = this.route.snapshot.paramMap.get('idStaff')!)
    this.get(this.idKindRoom);
  }

  // anh() {
  //   anh();
  // }
  public async get(idKindRoom:string){
    (await this.KindRoom.getkindRoom(idKindRoom)).subscribe(valua=>(this.data=valua ,
      // console.log(this.data),
      this.editform.patchValue({
        idKindRoom: this.data.idKindRoom,
        nameKindRoom: this.data.nameKindRoom,
        image: this.data.image,
        cusMax: this.data.cusMax,
        priceRoom:this.data.priceRoom,
  
      })
       )); 
  }

  public async update() {
    console.log(this.editform.value);
    (await this.KindRoom.editkindRoom(
      this.idKindRoom,
      this.editform.value.nameKindRoom,
      this.editform.value.image,
      this.editform.value.cusMax,
      this.editform.value.priceRoom,

    )).subscribe((value: any) => {
      alert(value['message']);
    });

  }

}
