import { RoomService } from 'src/app/services/room.service';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room.model'
import { Router } from '@angular/router';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  public data: Room[] = [];
  constructor(public Room: RoomService, public router: Router) {

  }
  public async get() {
    (await this.Room.getAllRoom()).subscribe(valua => (this.data = valua as Room[], console.log(this.data)));

  }
  ngOnInit(): void {
    this.get();
  }
  navigate(path: string, id: string) {
    // this.router.navigate([path, { id: id }]);
    this.router.navigate([path, id ]);
  }
  public async deleteRoom(apiPath: string) {
    (await this.Room.deteleRoom(apiPath)).subscribe(()=>{
      this.get();
    })
  }
}
