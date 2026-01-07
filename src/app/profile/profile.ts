import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAuth } from 'firebase/auth';
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

  async ngOnInit() {
    const auth = getAuth();
    const db = getFirestore();

    if (!auth.currentUser?.email) {
      this.loggedIn = false;
      return;
    }

    this.loggedIn = true;
    const email = auth.currentUser.email;

    const q = query(collection(db, 'users'), where('email', '==', email));
    const snap = await getDocs(q);

    if (!snap.empty) {
      this.userData = snap.docs[0].data();
    }
  }
}


