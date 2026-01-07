import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header'; 

@Component({
  selector: 'app-raspored',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent], 
  templateUrl: './schedule.html',
  styleUrls: ['./schedule.css']
})
export class Schedule {
  private router = inject(Router);

  // dugmad login/register
  navigate(url: string, event?: Event) {
    if (event) event.preventDefault();
    this.router.navigate([url]);
  }
}
