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
    this.get('kindroom/getAllKindRoom');
  }
  public async get(apiPath:string){
    (await  this.Kind.getkindRoom(apiPath)).subscribe(valua=>(this.data = valua as KindRoom[]));
      console.log(this.data)
  }
  navigate(path: string, id: string) {
    this.router.navigate([path, { id: id }]);
  }
}
