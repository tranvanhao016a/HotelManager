import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KindRoom } from 'src/app/models/kindroom.model';
import { KindroomService } from 'src/app/services/kindroom.service';

@Component({
  selector: 'app-kindroom',
  templateUrl: './kindroom.component.html',
  styleUrls: ['./kindroom.component.scss']
})
export class KindroomComponent implements OnInit {
  public data : KindRoom[]= [];
  constructor( public Kind : KindroomService,
    public router : Router,
     public route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.get();
  }
  public async get(){
    (await  this.Kind.getAllkindRoom()).subscribe(valua=>(this.data = valua as KindRoom[]));
      console.log(this.data)
  }
  navigate(path: string, idKindRoom: string) {
    this.router.navigate([path, { idKindRoom: idKindRoom }]);
  }
  public async deteleS(apiPath: string) {
    (await this.Kind.deteleKind(apiPath)).subscribe(()=>{
      this.get();
    })
  }
}
