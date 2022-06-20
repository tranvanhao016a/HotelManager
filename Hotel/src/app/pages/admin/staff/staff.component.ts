import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// declare const myFunction: any;
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  // myFunction() {
  //   myFunction();
  // }
  navigate(path: string){
    this.router.navigateByUrl(path);
  }
}
