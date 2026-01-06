import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private auth = inject(Auth);
  public router = inject(Router);

  email = '';
  password = '';

  async loginUser() {
   
    const cleanEmail = this.email.trim();

    // Provjera osnovnog formata email-a
    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      alert('Unesite validan email format!');
      return;
    }

    try {
      // Login na Firebase
      await signInWithEmailAndPassword(this.auth, cleanEmail, this.password);
      alert('Login uspješan!');
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      alert('Greška pri prijavi: ' + error.message);
    }
  }

  navigate(path: string, event?: Event) {
    try { event?.preventDefault(); } catch {}
    console.log('Login.navigate ->', path);
    this.router.navigate([path]).catch(err => {
      console.error('Login navigation error', err);
      alert('Navigation error: ' + err);
    });
  }
}
