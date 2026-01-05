import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  private auth = inject(Auth);
  private router = inject(Router);
  private firestore = inject(Firestore);

  name = '';
  email = '';
  password = '';
  theme = 'green'; // default tema

  async registerUser() {
    if (!this.name || !this.email || !this.password) {
      alert('Molimo popunite sva polja!');
      return;
    }

    try {
      // 1️⃣ Kreiranje korisnika u Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      // 2️⃣ Postavi displayName
      await updateProfile(userCredential.user, { displayName: this.name });

      // 3️⃣ Spremi dodatne podatke u Firestore
      await setDoc(doc(this.firestore, 'users', userCredential.user.uid), {
        name: this.name,
        email: this.email,
        theme: this.theme,
        trackers: []  // kasnije dodavati habit/sleep/study itd.
      });

      console.log('Korisnik dodan u Firestore:', userCredential.user.uid);

      alert('Registracija uspješna!');
      this.router.navigate(['/login']); // preusmjeri na login

    } catch (error: any) {
      console.error('Greška pri registraciji:', error);
      alert('Greška: ' + error.message);
    }
  }
}

