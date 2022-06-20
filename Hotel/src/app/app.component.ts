import { Component } from '@angular/core';
declare const myFunction: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hotel';
  constructor() { }

  ngOnInit(): void {
    myFunction();
  }
    myFunction() {
    myFunction();
  }
}
