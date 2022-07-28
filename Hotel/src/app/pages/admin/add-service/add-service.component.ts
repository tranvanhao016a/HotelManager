import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiecService } from 'src/app/services/serviec.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  public addform!: FormGroup;
  constructor(public Service: ServiecService,
    public router: Router,
    public route: ActivatedRoute,
    public formBuider: FormBuilder) {
    this.addform = this.formBuider.group({
      idService:'',
    nameService:'',
    priceService: 0,
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
    (await this.Service.addService(
      this.addform.value.idService,
      this.addform.value.nameService,
      this.addform.value.priceService,
    )).subscribe((value: any) => {
      alert(value['message']);
    });

  }

}
