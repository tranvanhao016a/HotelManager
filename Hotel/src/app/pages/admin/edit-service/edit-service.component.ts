import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiecService } from 'src/app/services/serviec.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {
public data: Service = {
  idService:'',
  nameService:'',
  priceService: 0,
}
public editform!: FormGroup;
  constructor(public Service: ServiecService, public router: Router,
    public route: ActivatedRoute,
    public formBuider: FormBuilder) {
      this.editform = this.formBuider.group({
        // idService:'',
        nameService:'',
        priceService: 0,
      })
     }
idService: string ='';
  ngOnInit(): void {
    this.idService = this.route.snapshot.paramMap.get('idService')!;
    // console.log(    this.idStaff = this.route.snapshot.paramMap.get('idStaff')!)
    this.get(this.idService);
  }
public async get(idService:string){
    (await this.Service.getService(idService)).subscribe(valua=>(this.data=valua ,
      // console.log(this.data),
      this.editform.patchValue({
        // idService: this.data.idService,
        nameService: this.data.nameService,
        priceService: this.data.priceService,
    
      })
       )); 
  }
  public async update() {
    console.log(this.editform.value);
   (await this.Service.editService(
      this.idService,
      this.editform.value.nameService,
      this.editform.value.priceService,
   )).subscribe((value: any) => {
      alert(value['message']);
    });
    
  }
}
