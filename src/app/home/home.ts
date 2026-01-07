import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header'; // <-- import Header

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent], // <-- dodaj HeaderComponent
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  private router = inject(Router);

  // dugmad login/register
  navigate(path: string, event?: Event) {
    if (event) event.preventDefault();
    this.router.navigate([path]);
  }
}
