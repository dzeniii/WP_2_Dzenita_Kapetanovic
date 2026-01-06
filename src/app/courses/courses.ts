import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.html',
  styleUrls: ['./courses.css']
})
export class Courses {

  constructor(private router: Router) {}

  // login i register
  navigate(url: string, event?: Event) {
    if (event) event.preventDefault();
    this.router.navigate([url]);
  }
}
