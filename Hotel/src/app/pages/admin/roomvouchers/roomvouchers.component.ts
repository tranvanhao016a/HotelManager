import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roomvouchers',
  templateUrl: './roomvouchers.component.html',
  styleUrls: ['./roomvouchers.component.scss']
})
export class RoomvouchersComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  navigate(path: string){
    this.router.navigateByUrl(path);
  }
}
