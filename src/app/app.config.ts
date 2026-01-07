import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Environment } from '../environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app-routing.module';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // Firebase inicijalizacija
    provideFirebaseApp(() => initializeApp(Environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};