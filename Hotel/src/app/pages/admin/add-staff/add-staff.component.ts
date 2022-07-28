import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { StaffService } from 'src/app/services/staff.service';
// import { Staff } from 'src/app/models/staff.model';
declare const anh: any;
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
//  public data : Account[] = [];
 public addform!: FormGroup;
  constructor(public Staff: StaffService,
     public Account : AccountService,
      public router : Router,
       public route: ActivatedRoute,
      public formBuider : FormBuilder){ 
        this.addform = this.formBuider.group({
          idStaff: '',
          nameStaff:'',
          position:'',
          phoneStaff:'',
          sexStaff :'',
          status: '',
          address:'',
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
   (await this.Staff.addStaff(
      this.addform.value.idStaff,
      this.addform.value.nameStaff,
      this.addform.value.position,
      this.addform.value.phoneStaff,
      this.addform.value.sexStaff,
      this.addform.value.status,
      this.addform.value.address,
      
   )).subscribe((value: any) => {
      alert(value['message']);
    });
    
  }

}
