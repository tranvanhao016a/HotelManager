import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';
import {Staff} from 'src/app/models/staff.model';
// declare const myFunction: any;
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  constructor(public Staff:StaffService, public router: Router) { }
  public data : Staff[] = [];
  ngOnInit(): void {
    this.get('staff/getAllStaff');
  }
  // myFunction() {
  //   myFunction();
  // }
  public async get(apiPath:string){
    (await  this.Staff.getStaff(apiPath)).subscribe(valua=>(this.data = valua as Staff[]));
      console.log(this.data)
  }
  navigate(path: string){
    this.router.navigateByUrl(path);
  }
}
