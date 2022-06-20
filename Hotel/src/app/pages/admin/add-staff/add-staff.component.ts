import { Component, OnInit } from '@angular/core';
declare const anh: any;
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.anh();
  }

  anh() {
    anh();
  }
}
