import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
declare const mypass: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
    mypass();
  }
  mypass(){
    mypass();
  }
    navigate(path: string){
    this.router.navigateByUrl(path);
  }

}
