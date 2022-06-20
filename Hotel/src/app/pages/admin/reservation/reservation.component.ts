import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  navigate(path: string){
    this.router.navigateByUrl(path);
  }
}
