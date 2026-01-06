import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
  theme = 'green';

  async registerUser() {
    if (!this.name || !this.email || !this.password) {
      alert('Molimo popunite sva polja!');
      return;
    }

    try {
      // Kreiranje korisnika u Auth
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      
      await updateProfile(userCredential.user, { displayName: this.name });

      // Spremanje korisnika u Firestore
      const uid = userCredential.user.uid;
      const userDocRef = doc(this.firestore, `users/${uid}`); 

      await setDoc(userDocRef, {
        name: this.name,
        email: this.email,
        theme: this.theme,
        trackers: []
      });

      alert('Registracija uspješna!');
      this.router.navigate(['/dashboard']);
      
    } catch (error: any) {
      console.error('Greška pri registraciji:', error);
      alert('Greška: ' + error.message);
    }
  }
}
