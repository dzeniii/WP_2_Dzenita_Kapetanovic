import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header'; // <-- import Header

@Component({
  selector: 'app-kontakt',
  standalone: true, // <-- obavezno za standalone
  imports: [CommonModule, RouterModule, HeaderComponent], // <-- dodaj Header ovdje
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'] 
})
export class Contact {

  constructor(private router: Router) {}

  // dugmad login/register
  navigate(url: string, event?: Event) {
    if (event) event.preventDefault();
    this.router.navigate([url]);
  }

  // validacija forme
  validateForm(): boolean {
    const ime = (document.getElementById("ime") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const tema = (document.getElementById("tema") as HTMLSelectElement).value;
    const poruka = (document.getElementById("poruka") as HTMLTextAreaElement).value.trim();
    const checkbox = (document.getElementById("privatnost") as HTMLInputElement).checked;

    if (!ime || !email || !tema || !poruka || !checkbox) {
      alert("Molimo ispunite sva polja i prihvatite politiku privatnosti.");
      return false;
    }
    alert("Vaša poruka je uspješno poslana! Hvala vam.");
    return true;
  }
}
