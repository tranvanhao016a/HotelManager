import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from 'src/app/models/staff.model';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {
  public data: Staff = {
    idStaff: '',
    nameStaff: '',
    position: '',
    phoneStaff: '',
    sexStaff: '',
    status: '',
    address: '',
  }
  public editform!: FormGroup;
  constructor(public Staff: StaffService, public router: Router,
    public route: ActivatedRoute,
    public formBuider: FormBuilder) {
    this.editform = this.formBuider.group({
      // idStaff: '',
      nameStaff: '',
      position: '',
      phoneStaff: '',
      sexStaff: '',
      status: '',
      address: '',
    })
  }
  idStaff: string ='';
  ngOnInit(): void {
    this.idStaff = this.route.snapshot.paramMap.get('idStaff')!;
    // console.log(    this.idStaff = this.route.snapshot.paramMap.get('idStaff')!)
    this.get(this.idStaff);
  }
  public async get(idStaff:string){
    (await this.Staff.getStaff(idStaff)).subscribe(valua=>(this.data=valua ,
      // console.log(this.data),
      this.editform.patchValue({
    nameStaff: this.data.nameStaff,
    position: this.data.position,
    phoneStaff: this.data.phoneStaff,
    sexStaff: this.data.sexStaff,
    status:this.data.status,
    address:this.data.address,
      })
       )); 
  }
  public async update() {
    console.log(this.editform.value);
   (await this.Staff.editStaff(
      this.idStaff,
      this.editform.value.nameStaff,
      this.editform.value.position,
      this.editform.value.phoneStaff,
      this.editform.value.sexStaff,
      this.editform.value.status,
      this.editform.value.address
      
   )).subscribe((value: any) => {
      alert(value['message']);
    });
    
  }
}
