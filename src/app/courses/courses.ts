import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header'; 

@Component({
  selector: 'app-courses',
  standalone: true,                
  imports: [CommonModule, RouterModule, HeaderComponent], 
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
