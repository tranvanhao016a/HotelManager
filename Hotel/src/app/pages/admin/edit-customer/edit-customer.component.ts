import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  public data : Customer = {
    idCard:'',
    nameCus:'',
    phoneCus:'',
    sexCus:'',
    address:'',
};
  public editform!: FormGroup;
  constructor(public Cus: CustomerService, public router : Router,
    public route: ActivatedRoute,
   public formBuider : FormBuilder) { 
    this.editform = this.formBuider.group({
    idCard:'',
    nameCus: '',
    // phoneCus:'',
    sexCus:'',
    address:'',
      // kindRoom:'',
    })
   }
   phoneCus: string ='';
  ngOnInit(): void {
    this.phoneCus = this.route.snapshot.paramMap.get('phoneCus')!;
    console.log( this.route.snapshot.paramMap.get('phoneCus'));
    this.get(this.phoneCus);
  }
  public async get(phoneCus:string){
    (await this.Cus.getCus(phoneCus)).subscribe(valua=>(this.data=valua ,
      this.editform.patchValue({
        idCard:this.data.idCard,
      nameCus:this.data.nameCus,
     // phoneCus:'',
      sexCus:this.data.sexCus,
      address:this.data.address,
      })
       ));
      
  }
  
  public async update() {
    console.log(this.editform.value);
   (await this.Cus.editCus(
      this.editform.value.idCard,
      this.editform.value.nameCus,
      this.phoneCus,
      this.editform.value.sexCus,
      this.editform.value.address
      
   )).subscribe((value: any) => {
      alert(value['message']);
    });
    
  }
}

