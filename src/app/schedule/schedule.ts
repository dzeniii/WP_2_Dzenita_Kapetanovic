import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raspored',
  templateUrl: './schedule.html',
  styleUrls: ['./schedule.css']  
})
export class Schedule {

  constructor(private router: Router) {}

  //login/register
  navigate(url: string, event?: Event) {
    if (event) event.preventDefault();
    this.router.navigate([url]);
  }

}
