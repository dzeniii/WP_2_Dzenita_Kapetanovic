import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigate(path: string, event?: Event) {
    event?.preventDefault();
    this.router.navigate([path]).catch(err => console.error('Navigation error:', err));
  }
}
