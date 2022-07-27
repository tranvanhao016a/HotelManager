import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public data : Account ={
    username: '',
    email: '',
    password: ''
  };
  public editform!: FormGroup;
  constructor(public router: Router, public route: ActivatedRoute,public formBuider : FormBuilder,public User: AccountService,private _location: Location) {
    this.editform = this.formBuider.group({
      email:this.data.email,
      password:this.data.password
    })
  }
  username : string ='';
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.get(this.username);
  }

  public check=false;
  public async get(username:string){
    (await  this.User.getAccount(username)).subscribe(valua=>( this.data= valua ,
      console.log(this.data),
    this.editform.patchValue({
      email:this.data.email,
      password:this.data.password
    })
    ));
  }
  public async update() {
    // console.log(this.editform.value);
   (await this.User.editAccount(this.username,this.editform.value.email,this.editform.value.password,))
   .subscribe((value: any) => {
    // alert();
    console.log(value['message'])
   if(value['message']=="Upload success!"){
    sessionStorage.setItem("mesUploat","Upload success!")
    this.check=true;}
  });
  }
  getData(){
    return sessionStorage.getItem('mesUploat');
  }
  removeData() {
    sessionStorage.removeItem('mesUploat');
    this.check=false;
  }
}
