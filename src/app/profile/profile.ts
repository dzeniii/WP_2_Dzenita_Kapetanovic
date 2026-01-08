import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  userData: any = null;
  loggedIn = false;
  email: string = '';
  name: string = '';

  async ngOnInit() {
    const auth = getAuth();
    const db = getFirestore();

    // onAuthStateChanged osigurava da čekamo Firebase Auth da se inicijalizira
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user && user.email) {
        this.loggedIn = true;
        this.email = user.email;

        try {
          const q = query(collection(db, 'users'), where('email', '==', this.email));
          const snap = await getDocs(q);

          if (!snap.empty) {
            this.userData = snap.docs[0].data();
            this.name = this.userData.name || '';
          } else {
            console.log('Nije pronađen korisnik u bazi!');
          }
        } catch (err) {
          console.error('Greška pri dohvaćanju korisnika:', err);
        }

      } else {
        this.loggedIn = false;
        this.userData = null;
        this.name = '';
      }
    });
  }
}
