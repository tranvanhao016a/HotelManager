import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KindroomService } from 'src/app/services/kindroom.service';

@Component({
  selector: 'app-add-kindroom',
  templateUrl: './add-kindroom.component.html',
  styleUrls: ['./add-kindroom.component.scss']
})
export class AddKindroomComponent implements OnInit {

  public addform!: FormGroup;
  constructor(public KindRoom: KindroomService,
    public router: Router,
    public route: ActivatedRoute,
    public formBuider: FormBuilder) {
    this.addform = this.formBuider.group({
      idKindRoom: '',
      nameKindRoom: '',
      image: '',
      cusMax: 0,
      priceRoom: 0,
    })
  }

  ngOnInit(): void {
    // this.anh();
  }

  // anh() {
  //   anh();
  // }
  public async add() {
    console.log(this.addform.value);
    (await this.KindRoom.addkindRoom(
      this.addform.value.idKindRoom,
      this.addform.value.nameKindRoom,
      this.addform.value.image,
      this.addform.value.cusMax,
      this.addform.value.priceRoom,

    )).subscribe((value: any) => {
      alert(value['message']);
    });

  }

}
