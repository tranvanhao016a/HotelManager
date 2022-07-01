import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public data : Account[] = [];
  constructor(public router: Router, public User: AccountService) { }

  ngOnInit(): void {
    this.get('account/getAllAccount');
  }
  navigate(path: string){
    this.router.navigateByUrl(path);
  }
  public async get(apiPath:string){
    (await  this.User.getAccount(apiPath)).subscribe(valua=>(this.data = valua as Account[]));
      console.log(this.data)
  }
}
